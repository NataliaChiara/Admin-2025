export interface ProductType {
  name: string;
  slug: string;
  price: number;
  description: string;
  section: string;
  image: string;
}

export interface InfoType {
  slug: string;
  name: string;
  logo: string;
}

export interface ContactType {
  type: string;
  label: string;
  link: string;
}

export interface ScheduleType {
  day: string;
  hours: string;
}

export interface InformationType {
  info: InfoType[];
  contact: ContactType[];
  schedule: ScheduleType[];
}
