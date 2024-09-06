import { Artworks } from "src/app/core/models/artworks.interface";

export class ArrayHelper {

    /**
   * Shuffles the elements of an array in place.
   *
   * @param array - The array of Artwork objects to shuffle.
   * @returns The shuffled array of Artwork objects.
   */
  static shuffleArray(array: Artworks[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

    /**
   * Retrieves a specified number of random items from an array.
   *
   * @param arr - The array of Artwork objects to select from.
   * @param numItems - The number of random items to retrieve.
   * @returns An array containing the selected random Artwork objects.
   */
  static getRandomItems(arr: Artworks[], numItems: number) {
    const shuffled = this.shuffleArray([...arr]);
    return shuffled.slice(0, numItems);
  }
}
