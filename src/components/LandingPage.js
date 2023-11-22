import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";

function LandingPage() { 
    return(
        <Flex height="500px" width="100%" direction='column' alignItems='center'>
            <Spacer />
            <VStack>
                <Text 
                    as='b' 
                    fontSize='6xl'
                    bgGradient='linear(to-l, #36D1DC, #5B86E5)'
                    bgClip='text'
                >
                    Discover the Emotion Behind Every Review
                </Text>
                <Text fontSize='2xl'>Leveraging DistilBERT for Advanced Sentiment Analysis</Text>
            </VStack>
            <Spacer />
        </Flex>
    )
}

export default LandingPage;
