import { Box, HStack, Spacer, Text, Flex, VStack, Button } from "@chakra-ui/react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from "react";

function Navbar() {
    return(
        <Flex minWidth='max-content' alignItems='center'>
            <HStack spacing='12px'>
                <Text paddingEnd='16px'>Project Popcorn Polarity</Text>
                <Button>Catalog</Button>
                <Button>Model</Button>
            </HStack>

            <Spacer/>
            <ColorModeSwitcher/>
        </Flex>
    )
}

export default Navbar;