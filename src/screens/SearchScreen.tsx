import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Card,
  Headline,
  Image,
  ImageList,
  Link,
  Logo,
  Paragraph,
  Screen,
  ScrollView,
  Spinner,
  TextInput,
} from '../primitives';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useFetch, useQuery, useCache } from '../hooks';
import DogService from '../services/DogService';
import { ImagesObj } from '../types';

// When mounted, request breeds list
// If time, store in Async storage so request wouldn't have to happen on mount everytime. Could store an updatedAt time and only have it update if it's old than x days
// If list was larger and I had more time, could implement a trie for faster searching
// When the user types their first letter, loop and query everything in the breed list that starts w/ that letter to get their images
// Cache the API request results
// Cache the images after loading with RN-fast-image...
// As they type more letters, filter the images down accordingly
// When they reset to zero letters, remove all display
// When they type first letter again, restart process, but pull from memo/cache if it's the same as before

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
  const service = useRef(new DogService());

  const toggleExpand = (str: string) => {
    setSearchTerm(str);
  };

  const handleSearch = (str: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const isFirstLetter = str.length === 1;
    const addedLetter = str.length > searchTerm.length;

    if (isFirstLetter && addedLetter) {
      getImages();
    }

    setSearchTerm(str);

    if (str.length === 0) {
      setSelections([]);
      setImages(undefined);
    } else {
      const newSelections = !isFirstLetter && addedLetter ? selections : breeds;
      setSelections(
        newSelections.filter((breed) =>
          breed.toLowerCase().startsWith(str.toLowerCase()),
        ),
      );
    }

    setSearchTerm(str);
  };

  // Get Breeds when we land and set them to state
  const { data: breedList, error: fetchBreedsError, loading } = useFetch(
    'https://dog.ceo/api/breeds/list/all',
  );

  useEffect(() => {
    if (breedList) {
      setBreeds(Object.keys(breedList));
    }
  }, [breedList]);

  const query = useRef(service.current.getImages);

  const {
    fetch: getImages,
    data: imageFetch,
    error: imageFetchError,
    loading: loadingImages,
  } = useCache(service.current.getImages, selections);

  useEffect(() => {
    // if (breeds.length > 0) {
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //   setSelections(
    //     searchTerm.length === 0
    //       ? setSelections([])
    //       : breeds.filter((breed) =>
    //           breed.toLowerCase().startsWith(searchTerm.toLowerCase()),
    //         ),
    //   );
    // }
  }, [searchTerm]);

  console.log('SELECTIONS', selections);

  useEffect(() => {
    // Pull all breeds when first search term is entered
    // if (searchTerm.length === 1) {
    //   getImages();
    // }
    // else if (searchTerm.length === 0) {
    //   setImages(undefined);
    // }
  }, [selections]);

  useEffect(() => {
    setImages(imageFetch);
  }, [imageFetch]);

  // const renderImages = () => {
  //   if (!images || !selections) {
  //     return;
  //   }

  //   return selections.map((selection) =>
  //     images[selection].map((image) => (
  //       <Image key={image} source={{ uri: image }} />
  //     )),
  //   );
  // };

  // const data =
  //   images && selections
  //     ? selections.map((selection) =>
  //         images[selection].map((image) => image),
  //       )[0]
  //     : [];

  // console.log('DATA!!!!!!', data);
  // console.log('SELECTIONS', selections);
  // console.log('IAMGES', images);

  console.log('IMAGES', images);

  return (
    <Screen loading={loading}>
      <Card>
        <Logo />
        <Headline center>Dream Dog Finder</Headline>
        <TextInput
          value={searchTerm}
          placeholder="Search for a breed..."
          onChangeText={handleSearch}
          autoFocus
        />
        {displayAutocomplete &&
          selections.map((selection) => (
            <Link key={selection} onPress={() => setSearchTerm(selection)}>
              {selection}
            </Link>
          ))}
      </Card>
      {displayAutocomplete && (
        <>
          {/* 
          <ImageList
            data={selections && images ? selections : []}
            extraData={images}
            renderItem={({ item: selection }) => {
              return images[selection].map((image) => (
                <Image key={image} source={{ uri: image }} />
              ));
            }}
            numColumns={4}
          /> */}

          <Spinner loading={loadingImages}>
            <ScrollView>
              <Box row style={{ flexWrap: 'wrap' }}>
                {images &&
                  Object.keys(images).length !== 0 &&
                  selections.length > 0 &&
                  selections.map((selection) =>
                    images[selection].map((image) => (
                      <Image key={image} source={{ uri: image }} />
                    )),
                  )}
              </Box>
            </ScrollView>
          </Spinner>
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;
