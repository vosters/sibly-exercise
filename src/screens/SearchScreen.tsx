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
import { useFetch, useCache } from '../hooks';
import DogService from '../services/DogService';
import { ImagesObj } from '../types';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selections, setSelections] = useState([]);
  const [images, setImages] = useState<undefined | ImagesObj>();
  const displayAutocomplete = searchTerm.length > 0;

  // Get Breeds when we land and set them to state
  const { data: breedList, error: fetchBreedsError, loading } = useFetch(
    'https://dog.ceo/api/breeds/list/all',
  );

  // Convert breeds into array and add to state after they've loaded
  useEffect(() => {
    if (breedList) {
      setBreeds(Object.keys(breedList));
    }
  }, [breedList]);

  // Handle state when search term is updated
  const handleSearch = (str: string) => {
    // Animate height of the card with breed names
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const isFirstLetter = str.length === 1;
    const addedLetter = str.length > searchTerm.length;

    setSearchTerm(str);

    // Don't show any dog names when input is blank
    if (str.length === 0) {
      setSelections([]);
    } else {
      // Filter from selections if they've fetched from the first letter
      const newSelections = !isFirstLetter && addedLetter ? selections : breeds;
      setSelections(
        newSelections.filter((breed) =>
          breed.toLowerCase().startsWith(str.toLowerCase()),
        ),
      );
    }
  };

  // Service for getting images
  const service = useRef(new DogService());
  const query = useRef(service.current.getImages);

  // Cache image fetching for selections to speed things up
  const {
    fetch: getImages,
    data: imageFetch,
    error: imageFetchError,
    loading: loadingImages,
  } = useCache(service.current.getImages, selections);

  // Get images when selections are updated
  useEffect(() => {
    getImages();
  }, [selections]);

  // Add images to ImageObj state once gotten from API
  useEffect(() => {
    setImages({ ...images, ...imageFetch });
  }, [imageFetch]);

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
          (imageFetchError && (
            <Error error={fetchBreedsError || imageFetchError} />
          ))}
      </Card>
      {displayAutocomplete && (
        <>
          <Card row wrap color="white" mt={-3} pt={5} mb={2}>
            {selections.map((selection) => (
              <Link
                key={selection}
                style={{ marginRight: 14 }}
                bold={searchTerm === selection}
                onPress={() => handleSearch(selection)}>
                {selection}
              </Link>
            ))}
          </Card>

          <Loading loading={loadingImages}>
            <FlatList
              style={{ borderRadius: 5 }}
              data={selections ? selections : []}
              extraData={images}
              renderItem={({ item: selection }): JSX.Element[] => {
                return (
                  images[selection] &&
                  images[selection].map((image) => (
                    <Image key={image} source={{ uri: image }} />
                  ))
                );
              }}
              numColumns={4}
            />
          </Loading>
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;
