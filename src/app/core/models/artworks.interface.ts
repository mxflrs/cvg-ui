import { SanityPicture } from "src/app/core/models/sanity-picture.interface";

export interface Artworks {
  // EXTRA
  isLiked?: boolean;

  _id: string;
  _updatedAt: string;
  image: SanityPicture;
  size?: {
    width?: number;
    height?: number;
  };
  title: string;
  keywords: string[];
  price?: number;
  about?: About;
  artist: Artist;
  info: {
    available: boolean
    display: boolean
  }
}

interface Medium {
  _id?: string;
  medium?: string;
}

interface About {
  mediums?: Medium[];
}

interface Artist {
  _id: string;
  name: string;
  bio: string;
}
