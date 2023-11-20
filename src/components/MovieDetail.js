import React, { useEffect, useState } from 'react';
import { Flex, Image, AspectRatio, Spinner, Text, HStack, VStack, Badge, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import moment from 'moment';

import ImagePlaceholder from '../images/no-image-placeholder.png';

function MovieDetail() {
    const [movie, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCreditsDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams(); // Get the movie ID from the URL parameters

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

            try {
                const response = await fetch(URL);
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details: ', error);
            }
        };

        const fetchMovieCreditsDetails = async () => {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

            try {
                const response = await fetch(URL);
                const data = await response.json();
                setMovieCreditsDetails(data);
            } catch (error) {
                console.error('Error fetching movie details: ', error);
            }
        };

        const fetchMovieReviews = async () => {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const URL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`;

            try {
                const response = await fetch(URL);
                const data = await response.json();
                setReviews(data.results); // Assuming the reviews are in 'results'
            } catch (error) {
                console.error('Error fetching movie reviews: ', error);
            }
        };

        fetchMovieDetails();
        fetchMovieCreditsDetails();
        fetchMovieReviews();
    }, [id]); // Dependency array ensures this effect runs when the 'id' changes

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
    const IMAGE_SIZE = 'w500';

    return (
        <Flex padding="16px" height="100% + 16px" width="100%" direction='column' alignItems='center'>
            {movie && movieCredits && reviews ? (
                <>
                    <HStack width='75%' align='flex-start' paddingBottom='16px' spacing='16px'>
                        <AspectRatio flex="1 1 auto" maxW='400px' ratio={2 / 3}>
                            <Image 
                                borderRadius="5"
                                src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${movie.poster_path}`} alt={movie.title}
                                boxSize='300px'
                                objectFit='cover'
                                fallback={ <Image src={ImagePlaceholder} /> }
                            />
                        </AspectRatio>

                        <VStack maxWidth='75%' align='baseline'>
                            <Text fontSize='4xl' as="b" noOfLines={2}>{movie.title}</Text>
                            <Text textColor='gray.500' paddingBottom='8px'>{ moment(movie.release_date).format('DD MMMM YYYY') }</Text>
                            
                            <HStack>{GenreBadges(movie.genres)}</HStack>

                            <HStack>
                                <CircularProgress value={Math.round(movie.vote_average * 10)} color='green.400'>
                                    <CircularProgressLabel>{Math.round(movie.vote_average * 10)}%</CircularProgressLabel>
                                </CircularProgress>

                                <Text>User Score</Text>
                            </HStack>

                            {Authors(movieCredits)}

                            <VStack align='flex-start'>
                                <Text fontSize='2xl' as='b'>Overview</Text>
                                { movie.tagline !== "" ? <Text textColor='gray.500' as='i'>{movie.tagline}</Text> : <></> }
                                <Text>{movie.overview}</Text>
                            </VStack>
                        </VStack>
                    </HStack>

                    <VStack width='75%' align='flex-start'>
                        <Text fontSize='4xl' as="b">User Reviews</Text>
                        { reviews.length > 0 ? MovieReviews(reviews) : <Text fontSize='2xl'>No User Reviews</Text>}
                    </VStack>
                </>
            ) : (
                <Spinner />
            )}
        </Flex>
    );
};

function GenreBadges(genres) { 
    const items = []

    genres.forEach((genre) => {
        items.push(
            <Badge key={genre.id}>{genre.name}</Badge>
        )
    });

    return items
}

function Authors(movieCredits) {
    const items = []
    const crew = movieCredits.crew.filter((person) => person.job === "Director")

    crew.forEach((person, index) => {
        console.log(person)
        items.push(
            <VStack key={index} align='flex-start'>
                <Text fontSize='2xl' as='b'>Director</Text>
                <Text >{person.name}</Text>
            </VStack>
        )
    });

    return items
}

function MovieReviews(reviews) { 
    const rows = [];

    reviews.forEach((review) => {
        rows.push(
            <VStack key={review.id} align='flex-start'>
                <Text fontSize='2xl' as='b'>{review.author}</Text>
                <Text>{review.content}</Text>
            </VStack>
        )
    });

    return rows;
}

export default MovieDetail;
