import React, { useState, useEffect } from 'react';
import {
    Input,
    Box,
    List,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button
} from '@chakra-ui/react';
import { debounce } from 'lodash';

const SearchMovies = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSuggestions = async (searchText) => {
        if (!searchText) {
            setSuggestions([]);
            return;
        }

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchText)}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        setSuggestions(data.results);
    } catch (error) {
        console.error('Error fetching suggestions: ', error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetchSuggestions(query);
  }, [query]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Box>
            <Button ml={2} onClick={handleOpenModal}>Search</Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setQuery('');  // Reset the search query
                    setSuggestions([]); // Optionally clear the suggestions as well
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search Results</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                        <List>
                            {suggestions.map((movie) => (
                                <ListItem key={movie.id} cursor="pointer">
                                {movie.title}
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SearchMovies;
