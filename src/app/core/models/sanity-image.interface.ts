export interface sanityImage {
  info: {
    display: boolean;
    available: boolean;
  };
  artist: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _type: 'artworks';
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: 'image';
  };
  _rev: string;
  about: {
    medium: Array<{
      _type: string;
      _key: string;
      _ref: string;
    }>;
    category: Array<{
      _ref: string;
      _type: string;
      _key?: string;
    }>;
  };
  _updatedAt: string;
}
