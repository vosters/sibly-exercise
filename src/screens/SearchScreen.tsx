// Hooks implementation
import React, { useEffect, useState } from 'react';
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
import { useFetch, useQuery } from '../hooks';
import DogService from '../services/DogService';
import { BreedType, ImagesObj } from '../types';
import TrieSearch from 'trie-search';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const trie = new TrieSearch();
const service = new DogService();

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selections, setSelections] = useState([]);
  const displayAutocomplete = searchTerm.length > 0;

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
  const getBreeds = (): BreedType[] => {
    return trie.get(searchTerm);
  };

  const {
    fetch: fetchImages,
    data: images,
    loading: fetchLoading,
    error: fetchError,
  } = useQuery(() => service.getImages(searchTerm));

  useEffect(() => {}, []);

  useEffect(() => {
    // Find and update the matching breeds
    setSelections(getBreeds());

    // Find and update the matching breeds
    fetchImages();
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
        {!!fetchBreedsError ||
          (!!fetchError && <Error error={fetchBreedsError || fetchError} />)}
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

          <Loading loading={fetchLoading}>
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
