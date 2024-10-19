import { Injectable } from '@angular/core';
import { ClientConfig, createClient, SanityClient, Any } from '@sanity/client';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { Artists } from 'src/app/core/models/artists.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { sanityImage } from 'src/app/core/models/sanity-image.interface';
import { environment } from 'src/environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  #dataSubject = new BehaviorSubject<Any>([]);

    // * SANITY CONFIG
    #clientConfig: ClientConfig = {
      projectId: environment.sanity.projectId,
      dataset: environment.sanity.dataset,
      apiVersion: environment.sanity.apiVersion,
      useCdn: environment.sanity.useCdn,
    };

    #sanityClient(): SanityClient {
      return createClient(this.#clientConfig);
    }

    async getData(): Promise<void> {
      try {
        const res = await this.#sanityClient().fetch('*');
        this.#dataSubject.next(res);
        this.populateData();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    populateData() {
      const data = this.#dataSubject.getValue();
      console.log(data)
    }

    getArtworksByArtistName(name: string): Observable<sanityImage[]> {
      const query = `*[_type == "artworks" && artist._ref in *[_type == "artists" && name match "${name}*"]._id]`;
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result)
      );
    }

    getAllCategories() {
      const query = '*[_type == "categories"] { title, _id, description }'
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result)
      );
    }

    getAllArtworks(): Observable<Artworks[]> {
      const query = `*[_type == "artworks"]{
        _id,
        _updatedAt,
        info,
        image,
        size,
        title,
        keywords,
        price,
        about {
          "mediums": medium[]->{
            _id,
            medium
          }
        },
        "artist": artist->{
          _id,
          name,
          bio,
        }
      }`;

      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result  as Artworks[])
      );
    }

    getAllArtworksHighRes(): Observable<Artworks[]> {
      const query = `*[_type == "artworks" && image.asset->metadata.dimensions.width > 1400 || image.asset->metadata.dimensions.height > 1400]{
        _id,
        _updatedAt,
        info,
        image,
        size,
        title,
        keywords,
        price,
        about {
          "mediums": medium[]->{
            _id,
            medium
          }
        },
        "artist": artist->{
          _id,
          name,
          bio,
        },
        "imageUrl": image.asset->url,
        "imageWidth": image.asset->metadata.dimensions.width,
        "imageHeight": image.asset->metadata.dimensions.height
      }`;

      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result as Artworks[])
      );
    }


    getArtistsById(id: string): Observable<Artists[]> {
      const query = `*[_type == "artists" && _id == "${id}"]`
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result as Artists[])
      );
    }

    getArtworkById(id: string): Observable<Artworks[]> {
      const query = `*[_type == "artworks" && _id == "${id}"]{
        _id,
        _updatedAt,
        info,
        image,
        size,
        title,
        keywords,
        price,
        about {
          "mediums": medium[]->{
            _id,
            medium
          }
        },
        "artist": artist->{
          _id,
          name,
          bio,
        }
      }`
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result as Artworks[])
      );
    }

    getAllArtists(): Observable<Artists[]> {
      const query = '*[_type == "artists"]'
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result as Artists[])
      );
    }

    getArtworksByArtistId(artistId: string) {
      const query = `*[_type == "artworks" && artist._ref == "${artistId}"]{
        _id,
        _updatedAt,
        info,
        image,
        size,
        title,
        keywords,
        price,
        about {
          "mediums": medium[]->{
            _id,
            medium
          }
        },
        "artist": artist->{
          _id,
          name,
          bio,
        }
      }`;
      return from(this.#sanityClient().fetch(query)).pipe(
        map(result => result as Artworks[])
      );
    }
}
