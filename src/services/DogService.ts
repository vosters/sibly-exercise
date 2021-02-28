import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LocalStateService from './LocalStateService';

type ImagesObj = { [key: string]: string[] };

class DogService {
  constructor() {
    const storageService = new LocalStateService();
  }

  //   public storeDogs = (data: ) => {
  //     storageService.set('breeds', )
  //   }

  public getImages = async (breeds: string[]): Promise<string[]> => {
    const imagesObj: ImagesObj = {};

    console.log('RUN BREEDS!!!!', breeds)
    breeds.forEach(async (breed) => {
      try {
        const url = `https://dog.ceo/api/breed/${breed}/images`;
        const res = await fetch(url);
        const json = await res.json();
        imagesObj[breed] = json;
      } catch (err) {
        console.log('Error getting images', err);
      }

      console.log('images OBJ', imagesObj);

      return imagesObj;
    });

    return;
  };

  public getBreeds = async () => {
    const data = await fetch(`https://dog.ceo/api/breeds/list/all`)
      .then((response) => response.json())
      .then((json) => {
        return json.message;
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export default DogService;
