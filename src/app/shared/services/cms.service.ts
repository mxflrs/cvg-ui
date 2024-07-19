import { Injectable } from '@angular/core';
import { ClientConfig, createClient, SanityClient, Any } from '@sanity/client';
import { BehaviorSubject } from 'rxjs';
import environment from 'src/environments/environtment.development';

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
}
