export interface ProductType {
  name: string;
  slug: string;
  price: number;
  description: string;
  section: string;
  image: string;
}

export interface InformationType {
  info: {
    slug: string;
    name: string;
    logo: string;
  }[];
  contact: {
    type: string;
    label: string;
    link: string;
    icon: string;
  }[];
  schedule: {
    day: string;
    hours: string;
  }[];
}
