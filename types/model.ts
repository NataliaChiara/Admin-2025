export interface ProductType {
  name: string,
  slug: string;
  price: number,
  description: string,
  sectionSlug: string,
  image: string,
}

export interface SectionType {
  name: string,
  slug: string,
}