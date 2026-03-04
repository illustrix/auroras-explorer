import process from 'node:process'
import { program } from 'commander'
import { db } from '@/server/common/db'
import { logger } from '@/server/common/logger'
import {
  normalizeContractId,
  normalizeContractIdForContract,
} from '@/server/store/contract'

const main = async () => {
  program
    .option('--table <table>', 'Table to normalize', 'contracts')
    .option(
      '--with-conditions',
      'Whether to normalize conditions as well',
      false,
    )
  program.parse(process.argv)
  const opts = program.opts()

  for await (const contract of db(opts.table)
    .orderBy('CreatedAt', 'ASC')
    .stream()) {
    if (!contract.ContractId.includes('-')) {
      continue
    }
    await db.transaction(async trx => {
      const existing = await trx(opts.table)
        .where('ContractId', contract.ContractId)
        .first()
      if (
        new Date(existing.Timestamp).valueOf() >
        new Date(contract.Timestamp).valueOf()
      ) {
        logger.info(`Skipping contract with id ${contract.ContractId}`)
        return
      }
      const uniqueColumns =
        opts.table === 'contracts'
          ? ['ContractId']
          : ['ContractId', 'UserNameSubmitted']
      await db(opts.table)
        .insert({
          ...contract,
          ContractId: normalizeContractId(contract.ContractId),
          UpdatedAt: new Date(),
        })
        .onConflict(uniqueColumns)
        .merge()
      logger.info(
        `Normalized contract id ${contract.ContractId} to ${normalizeContractId(contract.ContractId)}`,
      )
    })

    if (opts.withConditions) {
      const conditions = await db('fio_user_contract_conditions').where(
        'ContractId',
        contract.ContractId,
      )

      await db('fio_user_contract_conditions')
        .insert(conditions.map(normalizeContractIdForContract))
        .onConflict(['ConditionId', 'UserNameSubmitted'])
        .merge()
      await db('fio_user_contract_conditions')
        .delete()
        .where('ContractId', contract.ContractId)
    }

    await db(opts.table).delete().where('ContractId', contract.ContractId)
  }
}

main()
  .then(() => {
    console.log('Done')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
