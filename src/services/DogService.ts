import React from 'react';
import { ImagesObj, BreedType } from '../types';
import TrieSearch from 'trie-search';

class DogService {
  private trie: any;
  private images: ImagesObj;

  constructor() {
    this.trie = new TrieSearch();
    this.images = {};

    // Add breeds to trie on mount
    this.addBreeds();
  }

  public getImages = async (
    search: string | BreedType[],
  ): Promise<string[]> => {
    // SearchScreenTrie uses the class based trie. SearchScreen passes the selections as a parameter
    const breeds = typeof search === 'string' ? this.getBreeds(search) : search;
    let imageArr = [];

    await Promise.all(
      breeds.map(async (breed) => {
        const key = breed._key_;

        // If breed is already in cache
        if (this.images[key]) {
          imageArr = [...imageArr, ...this.images[key]];
        } else {
          // If breed isn't in cache, fetch it from database
          try {
            const url = `https://dog.ceo/api/breed/${key}/images`;
            const res = await fetch(url);
            const json = await res.json();
            const value = json.message as string[];
            this.images[key] = value;
            imageArr = [...imageArr, ...value];
          } catch (err) {
            console.log('Error getting images', err);
            Promise.reject('Error getting images');
          }
        }
      }),
    );

    return imageArr;
  };

  public addBreeds = async (): Promise<void> => {
    try {
      const res = await fetch(`https://dog.ceo/api/breeds/list/all`);
      const json = await res.json();
      const breedsObj = json.message;
      this.trie.addFromObject(breedsObj);
    } catch (error) {
      Promise.reject('Error fetching dogs');
    }
  };

  public getBreeds = (search: string): BreedType[] => {
    return this.trie.get(search);
  };
}

export default DogService;
