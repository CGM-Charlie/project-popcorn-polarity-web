import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    AspectRatio,
    Input,
    Image,
    Box,
    List,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    Text,
    HStack,
    VStack
} from '@chakra-ui/react';
import { debounce } from 'lodash';

import ImagePlaceholder from '../images/no-image-placeholder.png';

const SearchMovies = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // React Router Navigation
    const history = useNavigate();

    const navigateToMovieDetails = (movieId) => {
        setIsModalOpen(false);
        setQuery('');
        history(`/movie/${movieId}`);
    };

    // Query
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
        // eslint-disable-next-line
    }, [query]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
    const IMAGE_SIZE = 'w500';

    return (
        <Box>
            <Button ml={2} onClick={handleOpenModal}>Search</Button>

            <Modal
                size='xl'
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setQuery('');  // Reset the search query
                    setSuggestions([]); // Optionally clear the suggestions as well
                }}
            >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Search Results</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Search for a movie..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <List spacing='16px' paddingTop='16px' paddingBottom='16px'>
                            {suggestions.map((movie) => (
                                <ListItem key={movie.id} cursor="pointer" onClick={() => navigateToMovieDetails(movie.id)}>
                                    <HStack align='flex-start'>
                                        <AspectRatio flex="1 1 auto" maxW='100px' ratio={2 / 3}>
                                            <Image
                                                borderRadius="5"
                                                src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${movie.poster_path}`} alt={movie.title}
                                                boxSize='100px'
                                                objectFit='cover'
                                                fallback={ <Image src={ImagePlaceholder} /> }
                                            />
                                        </AspectRatio>

                                        <VStack maxWidth='75%' align='baseline'>
                                            <Text as="b" noOfLines={2}>{movie.title}</Text>
                                            <Text textColor='gray.400'>{ moment(movie.release_date).format('DD MMMM YYYY') }</Text>
                                            <Text noOfLines={3}>{movie.overview}</Text>
                                        </VStack>
                                    </HStack>
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
