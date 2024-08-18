import { Injectable } from '@angular/core';
import { ClientConfig, createClient, SanityClient, Any } from '@sanity/client';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
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
}
