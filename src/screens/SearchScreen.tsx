import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  Error,
  FlatList,
  Headline,
  Image,
  Link,
  Logo,
  Screen,
  Loading,
  TextInput,
} from '../primitives';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useFetch } from '../hooks';
import DogService from '../services/DogService';
import { ImagesObj } from '../types';
import TrieSearch from 'trie-search';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const trie = new TrieSearch();

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selections, setSelections] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const displayAutocomplete = searchTerm.length > 0;
  const [loadingImages, setLoadingImages] = useState(false);
  const service = useRef(new DogService());
  const imageCache: ImagesObj = {};

  // Get breeds when we land and set them to state
  const { data: breedList, error: fetchBreedsError, loading } = useFetch(
    'https://dog.ceo/api/breeds/list/all',
  );

  // Add breeds to trie
  useEffect(() => {
    if (breedList) {
      trie.addFromObject(breedList);
    }
  }, [breedList]);

  // Handle state when search term is updated
  const handleSearch = (str: string) => {
    // Animate height of the card with breed names
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Update search term
    setSearchTerm(str);
  };

  // Utility functions
  const getBreeds = () => {
    return trie.get(searchTerm);
  };

  const getImages = async (): Promise<string[]> => {
    const breeds = getBreeds();
    let imageArr = [];

    await Promise.all(
      breeds.map(async (breed) => {
        const key = breed._key_;

        // If breed is already in cache
        if (images[key]) {
          setImages([...imageArr, ...imageCache[key]]);
        } else {
          try {
            const url = `https://dog.ceo/api/breed/${key}/images`;
            const res = await fetch(url);
            const json = await res.json();
            const value = json.message as string[];
            imageCache[key] = value;
            imageArr = [...imageArr, ...value];
          } catch (err) {
            console.log('Error getting images', err);
            setError('Error getting images');
          }
        }
      }),
    );

    return imageArr;
  };

  useEffect(() => {
    // Find and update the matching breeds
    setSelections(getBreeds());

    // Find and update the matching breeds
    const imageGetter = async () => {
      setLoadingImages(true);

      try {
        const imageArr = await getImages();
        setImages(imageArr);
      } catch (err) {
        setError(err);
      }
      setLoadingImages(false);
    };
    imageGetter();
  }, [searchTerm]);

  return (
    <Screen loading={loading}>
      <Card style={{ zIndex: 1 }}>
        <Logo />
        <Headline center>Dream Dog Finder</Headline>
        <TextInput
          value={searchTerm}
          placeholder="Search for a breed..."
          onChangeText={handleSearch}
          autoFocus
        />
        {fetchBreedsError ||
          (error && <Error error={fetchBreedsError || error} />)}
      </Card>
      {displayAutocomplete && (
        <>
          <Card row wrap color="white" mt={-3} pt={5} mb={2}>
            {selections.map((selection) => (
              <Link
                key={selection}
                style={{ marginRight: 14 }}
                bold={searchTerm === selection}
                onPress={() => handleSearch(selection._key_)}>
                {selection._key_}
              </Link>
            ))}
          </Card>

          <Loading loading={loadingImages}>
            <FlatList
              style={{ borderRadius: 5 }}
              data={images}
              renderItem={({ item: image }, idx: number) => (
                <Image key={`${idx}-${image}`} source={{ uri: image }} />
              )}
              numColumns={4}
            />
          </Loading>
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;
