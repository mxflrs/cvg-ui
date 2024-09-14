import { SanityPicture } from "src/app/core/models/sanity-picture.interface"

export interface Artists {
  _id: string
  _updatedAt: Date
  name: string
  surname?: string
  country: string
  picture?: SanityPicture
}

