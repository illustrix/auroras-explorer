import fs from 'fs'
import path from 'path'

function generateMaterialNameMap(materialTablePath) {
  const content = fs.readFileSync(materialTablePath, 'utf8')

  const lines = content.split('\n')
  const materialMap = {}

  for (const line of lines) {
    if (line.trim().startsWith('|') && !line.includes('物品') && !line.includes('---')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p)
      if (parts.length >= 4) {
        const ticker = parts[0]
        const name = parts[3]
        if (ticker && name) {
          materialMap[ticker] = name
        }
      }
    }
  }

  return materialMap
}

const materialTablePath = process.argv[2] || process.env.MATERIAL_TABLE_PATH || path.join(process.cwd(), '材料表.md')
const materialNames = generateMaterialNameMap(materialTablePath)

const materialNamesI18n = Object.entries(materialNames).reduce((acc, [ticker, name]) => {
  acc[ticker] = name
  return acc
}, {})

console.log(JSON.stringify(materialNamesI18n, null, 2))