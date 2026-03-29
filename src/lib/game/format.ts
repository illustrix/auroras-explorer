import { snakeCase } from 'es-toolkit'

export const formatMaterialName = (name: string) =>
  snakeCase(name)
    .replaceAll('_', ' ')
    .split(' ')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')
