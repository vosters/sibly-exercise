# SIBLY EXERCIDE

## Developer: Michael Vosters

# OVERVIEW

1. Make API call for all breeds on mount
2. Add the breeds to a trie for faster search
3. Update the matching breeds and images every time the user enters a search term

# NOTES

- Wrote in two different styles just for exploration in SearchScreen and SearchScreenTrie
  --- SearchScreen is using hooks and all inline
  --- SearchScreenTrie is pulling from a service class

- Added image cacheing within Image.tsx for faster loading

# IF MORE TIME

- Could store the breeds in async storage to save an API call if the user navigated to another screen and back since it won't update that often. Then just have a conditional to make sure to re-pull every so often.

- In SearchScreen, clean up the hooks and put the logic in a Controller Function Component.

- Refactor both styles to put all the logic in the controllers so they could re-use the same display components

- Figure out why it's showing the yellow error for missing keys.

- Add a splash screen
