import { Flex, SimpleGrid, Image, AspectRatio, Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";

function Catalog() {
    const [movies, setMovies] = useState([]);

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
                    // TODO: Add url to detail of movie
                    <Box as='button' key={movie.id} onClick={() => console.log(movie.title)} >
                        <AspectRatio maxW='200px' ratio={2 / 3}>
                            <Image 
                                src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${movie.poster_path}`} alt={movie.title}
                                boxSize='300px'
                                objectFit='cover'
                            />
                        </AspectRatio>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    )
}

export default Catalog;
