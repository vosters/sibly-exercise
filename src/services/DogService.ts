import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import LocalStateService from './LocalStateService';
import { ImagesObj } from '../types';

class DogService {
  constructor() {
    const storageService = new LocalStateService();
  }

  public getImages = async (breeds: string[]): Promise<ImagesObj> => {
    const imagesObj: ImagesObj = {};

    await Promise.all(
      breeds.map(async (breed) => {
        try {
          const url = `https://dog.ceo/api/breed/${breed}/images`;
          const res = await fetch(url);
          const json = await res.json();
          imagesObj[breed] = json.message;
        } catch (err) {
          console.log('Error getting images', err);
          Promise.reject('Error getting images');
        }
      }),
    );

    return imagesObj;
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
