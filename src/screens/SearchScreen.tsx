import React, { useEffect, useState, useRef } from 'react';
import { Image, Paragraph, Screen, TextInput } from '../primitives';
import { useFetch, useQuery, useCache } from '../hooks';
import DogService from '../services/DogService';
// When mounted, request breeds list and store in async data
// Suggest that we setup a scheduled job to periodically update the list from there on out or just keep it as to whenever they land
// When the user types their first letter, loop and query everything in the breed list that starts w/ that letter to get their images
// Memoize the results
// Cache the images with RN...
// As they type more letters, filter the images down accordingly
// When they reset to zero letters, remove all display
// When they type first letter again, restart process, but pull from memo/cache if it's the same as before

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selections, setSelections] = useState([]);
  const [images, setImages] = useState([]);
  const [imageSelections, setImageSelections] = useState([]);
  const displayAutocomplete = searchTerm.length > 0;
  const service = useRef(new DogService());

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
    if (breeds.length > 0) {
      setSelections(
        breeds.filter((breed) =>
          breed.toLowerCase().startsWith(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    // Pull all breeds when first search term is entered
    if (searchTerm.length === 1) {
      getImages();
    }
  }, [selections]);

  useEffect(() => {
    setImages(imageFetch);
  }, [imageFetch]);

  console.log('IAMGES', images && Object.keys(images));

  return (
    <Screen loading={loading}>
      <TextInput
        label="What breed do you like?"
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoFocus
      />
      {displayAutocomplete && (
        <>
          {selections.map((selection) => (
            <Paragraph key={selection}>{selection}</Paragraph>
          ))}

          {/* {images &&
            images.map((image) => (
              <Image key={image} source={{ uri: image }} />
            ))} */}
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;
