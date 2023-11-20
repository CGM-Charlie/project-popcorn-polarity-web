import { Flex, SimpleGrid, Image, AspectRatio, Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import LandingPage from "./LandingPage";
import ImagePlaceholder from '../images/no-image-placeholder.png';

function Catalog() {
    const [movies, setMovies] = useState([]);
    
    // React Router Navigation
    const history = useNavigate();

    const navigateToMovieDetails = (movieId) => {
        history(`/movie/${movieId}`);
    };

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            setMovies(data.results);
          })
          .catch(error => console.error('Error fetching data: ', error));
      }, []);

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
    const IMAGE_SIZE = 'w780';

    return(
        <Flex padding="16px" height="100% + 16px" width="100%" direction='column'>
            <LandingPage />

            <Text as="b" fontSize="4xl" paddingBottom="12px">Featured Films</Text>

            <SimpleGrid minChildWidth='200px' spacing={10}>
                {movies.map(movie => (
                    <Box as='button' key={movie.id} onClick={() => navigateToMovieDetails(movie.id)} >
                        <AspectRatio maxW='200px' ratio={2 / 3}>
                            <Image 
                                borderRadius="5"
                                src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${movie.poster_path}`} alt={movie.title}
                                boxSize='300px'
                                objectFit='cover'
                                fallback={ <Image src={ImagePlaceholder} /> }
                            />
                        </AspectRatio>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    )
}

export default Catalog;
