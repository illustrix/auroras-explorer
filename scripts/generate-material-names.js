// 从材料表生成材料名称映射
import fs from 'fs'
import path from 'path'

function generateMaterialNameMap() {
  const materialTablePath = 'c:\\Users\\kilsa\\Desktop\\code\\资料\\材料表.md'
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

const materialNames = generateMaterialNameMap()

// 生成 i18n 格式的材料名称
const materialNamesI18n = Object.entries(materialNames).reduce((acc, [ticker, name]) => {
  acc[ticker] = name
  return acc
}, {})

console.log(JSON.stringify(materialNamesI18n, null, 2))