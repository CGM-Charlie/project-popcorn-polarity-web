import { HStack, Spacer, Text, Flex, Button, Link } from "@chakra-ui/react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from "react";
import MovieSearchBar from "./MovieSearchBar";

function Navbar() {
    return(
        <Flex alignItems='center'>
            <HStack spacing='12px'>
                <Link href="/home">
                    <Button variant="link">
                        <Text as="b" fontSize="2xl" paddingEnd='16px'>Project Popcorn Polarity</Text>
                    </Button>
                </Link>
                <Button>Model</Button>
                <MovieSearchBar />
            </HStack>

            <Spacer/>
            <ColorModeSwitcher/>
        </Flex>
    )
}

export default Navbar;
