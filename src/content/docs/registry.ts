export interface DocEntry {
  slug: string
  titleKey: string
  descriptionKey: string
  icon?: string
}

export const docsRegistry: DocEntry[] = [
  {
    slug: 'getting-started',
    titleKey: 'docs.gettingStarted.title',
    descriptionKey: 'docs.gettingStarted.description',
  },
  {
    slug: 'materials',
    titleKey: 'docs.materials.title',
    descriptionKey: 'docs.materials.description',
  },
  {
    slug: 'raw-materials',
    titleKey: 'docs.rawMaterials.title',
    descriptionKey: 'docs.rawMaterials.description',
  },
  {
    slug: 'metals-alloys',
    titleKey: 'docs.metalsAlloys.title',
    descriptionKey: 'docs.metalsAlloys.description',
  },
  {
    slug: 'construction',
    titleKey: 'docs.construction.title',
    descriptionKey: 'docs.construction.description',
  },
  {
    slug: 'chemicals-plastics',
    titleKey: 'docs.chemicalsPlastics.title',
    descriptionKey: 'docs.chemicalsPlastics.description',
  },
  {
    slug: 'electronics',
    titleKey: 'docs.electronics.title',
    descriptionKey: 'docs.electronics.description',
  },
  {
    slug: 'ship-components',
    titleKey: 'docs.shipComponents.title',
    descriptionKey: 'docs.shipComponents.description',
  },
  {
    slug: 'specialty',
    titleKey: 'docs.specialty.title',
    descriptionKey: 'docs.specialty.description',
  },
  {
    slug: 'production',
    titleKey: 'docs.production.title',
    descriptionKey: 'docs.production.description',
  },
  {
    slug: 'agricultural-products',
    titleKey: 'docs.agriculturalProducts.title',
    descriptionKey: 'docs.agriculturalProducts.description',
  },
  {
    slug: 'consumables',
    titleKey: 'docs.consumables.title',
    descriptionKey: 'docs.consumables.description',
  },
]
