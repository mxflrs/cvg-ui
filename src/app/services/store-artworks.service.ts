import { Injectable } from '@angular/core';
import { ArtworkSimple } from 'src/app/core/models/artwork-simple.interface';
import { Artworks } from 'src/app/core/models/artworks.interface';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class StoreArtworksService {
  private storageKey = 'artworks';

  constructor(private toastService: ToastService) { }

  storeArtworks(artworks: ArtworkSimple[]): void {
    if (!Array.isArray(artworks)) {
      this.toastService.show('Input must be an array of artworks.', 'error')
      return;
    }

    for (const artwork of artworks) {
      if (!artwork.id || !artwork.title) {
        this.toastService.show("Each artwork must have an id and a title.", 'error');
        return;
      }
    }

    const artworksJSON = JSON.stringify(artworks);
    localStorage.setItem(this.storageKey, artworksJSON);
  }

  storeArtwork(artwork: ArtworkSimple) {
    if (!artwork.id || !artwork.title) {
      this.toastService.show("Each artwork must have an id and a title.", 'error');
      return;
    }

    const existingArtworksJSON = localStorage.getItem(this.storageKey);
    let artworks: ArtworkSimple[] = [];

    // Check if existing artworks exist and parse them
    if (existingArtworksJSON) {
      try {
        const parsedArtworks = JSON.parse(existingArtworksJSON);
        // Ensure that parsedArtworks is an array
        if (Array.isArray(parsedArtworks)) {
          artworks = parsedArtworks;
        } else {
          console.error("Parsed data is not an array. Initializing with an empty array.");
        }
      } catch (error) {
        console.error("Failed to parse existing artworks from local storage:", error);
      }
    }

    // Check if the artwork already exists
    const artworkIndex = artworks.findIndex(existingArtwork => existingArtwork.id === artwork.id);

    if (artworkIndex !== -1) {
      // If the artwork exists, remove it from the array
      artworks.splice(artworkIndex, 1);
      this.toastService.show("Artwork removed", 'warning');
    } else {
      // If the artwork does not exist, add it to the array
      artworks.push(artwork);
      this.toastService.show("Artwork added", 'success');
    }

    // Store the updated array back in local storage
    const updatedArtworksJSON = JSON.stringify(artworks);
    localStorage.setItem(this.storageKey, updatedArtworksJSON);
  }

  getArtworks(): ArtworkSimple[] {
    const artworksJSON = localStorage.getItem(this.storageKey);
    if (artworksJSON) {
      return JSON.parse(artworksJSON);
    }
    return []; // Return an empty array if no artworks are found
  }

  clearArtworks(): void {
    localStorage.removeItem(this.storageKey);
  }

  filteredLikedArtworks(artworkList: Artworks[]) {
    const likedIds = this.getArtworks().map(x => x.id);
    const result = artworkList.map(art => {
      art.isLiked = likedIds.includes(art._id);
      return art;
    });

    return result;
  }
}
