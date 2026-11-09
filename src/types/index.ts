export type PhotographyCategory =
  | 'All'
  | 'Portraits'
  | 'Outdoor Portraits'
  | 'Editorial'
  | 'Creative Sessions';

export interface Photograph {
  id: string;
  number: string;
  title: string;
  category: Exclude<PhotographyCategory, 'All'>;
  src: string;
  alt: string;
  location: string;
  year: string;
  story: string;
  camera: {
    body: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  featuredInHero?: boolean;
  featuredStoryId?: string;
  editorialWidth?: 'tall' | 'wide' | 'standard';
}

export interface FeaturedStory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  date: string;
  description: string;
  coverImage: string;
  photos: Photograph[];
  quote: string;
  tags: string[];
}

