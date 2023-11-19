import { Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import MovieSearchBar from "./MovieSearchBar";

function LandingPage() { 
    return(
        <Flex width="100%" direction='column' align='center'>
            <Spacer></Spacer>
            <Text>Landing Page</Text>
            <Spacer></Spacer>
        </Flex>
    )
}

export default LandingPage;
