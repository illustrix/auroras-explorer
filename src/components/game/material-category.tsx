export const getMaterialCategoryTheme = (category: string) => {
  return `material-category-${category.toLowerCase().replace(/ /g, '-').replaceAll(/\(|\)/g, '')}`
}
