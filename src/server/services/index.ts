import { logger } from '../common/logger'
import { localFsCache } from '../util/cache/fs-cache'
import { GameDataService } from './game-data'

export class Services {
  constructor(public readonly gameData: GameDataService) {}

  static async setup() {
    const gameDataService = new GameDataService(localFsCache)
    logger.info('Loading game data...')
    await gameDataService.loadAll()
    logger.info('Game data loaded')
    gameDataService.autoUpdate()

    return new Services(gameDataService)
  }
}
