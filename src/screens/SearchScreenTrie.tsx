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
import DogService from '../services/DogService';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selections, setSelections] = useState([]);
  const [images, setImages] = useState<string[]>([]);

  const [error, setError] = useState('');
  const displayAutocomplete = searchTerm.length > 0;

  const service = useRef(new DogService());

  // Handle state when search term is updated
  const handleSearch = (str: string) => {
    // Animate height of the card with breed names
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Update search term
    setSearchTerm(str);
  };

  // When user types letter...
  useEffect(() => {
    // Find and update the matching breeds
    const newSelections = service.current.getBreeds(searchTerm);
    setSelections(newSelections);

    // Find and update the matching breeds
    const imageGetter = async () => {
      // setLoading(true);

      try {
        const imageArr = await service.current.getImages(searchTerm);
        setImages(imageArr);
        // setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    imageGetter();
  }, [searchTerm]);

  return (
    <Screen loading={false}>
      <Card style={{ zIndex: 1 }}>
        <Logo />
        <Headline center>Dream Dog Finder</Headline>
        <TextInput
          value={searchTerm}
          placeholder="Search for a breed..."
          onChangeText={handleSearch}
          autoFocus
        />
        {!!error && <Error error={error} />}
      </Card>
      {displayAutocomplete && (
        <>
          <Card row wrap color="white" mt={-3} pt={5} mb={2}>
            {selections.map((selection, idx) => (
              <Link
                key={`${idx}-${selection._key_}`}
                style={{ marginRight: 14 }}
                bold={searchTerm === selection._key_}
                onPress={() => handleSearch(selection._key_)}>
                {selection._key_}
              </Link>
            ))}
          </Card>
          <Loading loading={false}>
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
