import { Badge, Button, Flex, Grid, GridItem, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const PredictionComponent = () => {
    const [inputString, setInputString] = useState('');
    const [prediction, setPrediction] = useState('');

    const handleInputChange = (e) => {
        setInputString(e.target.value);
    };

    const handlePredictClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputString }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            setPrediction(result[0]);
        } catch (error) {
            console.error('Failed to fetch prediction:', error);
        }
    };

    const resultText = prediction === 'negative' ? "Negative" : "Positive";

    return (
        <Grid
            templateAreas={`
                "description tester"
            `}
            gridTemplateColumns={'60% 1fr'}
            height='100%'
            width='100%'
            gap='3'
            padding='16px'
        >
            <GridItem overflow={'scroll'} area={'description'} >
                <Flex height="100%" width="100%" direction='column' alignItems='center'>
                    <Spacer/>
                    {ModelDescription()}
                    <Spacer/>
                </Flex>
            </GridItem>
            <GridItem area={'tester'}>
                <Flex height="100%" width="100%" direction='column' alignItems='center'>
                    <Spacer/>
                    <VStack width='600px' alignItems={'flex-start'}>
                        <Text as='b' fontSize='3xl'>Test the model</Text>
                        {
                            prediction ? prediction === 'negative' ? 
                            <Badge variant='solid' fontSize='0.8em' colorScheme='red'>Negative</Badge> : 
                            <Badge variant='solid' fontSize='0.8em' colorScheme='green'>Positive</Badge> : 
                            <></>
                        }
                        <VStack width='100%'>
                            <Textarea 
                                width="100%" 
                                minHeight='300px' 
                                type="text" 
                                value={inputString} 
                                onChange={handleInputChange}
                                placeholder='Write a review...'
                            />
                            <Button onClick={handlePredictClick}>Predict</Button>
                        </VStack>
                    </VStack>
                    <Spacer/>
                </Flex>
            </GridItem>
        </Grid>
    );
};

function ModelDescription() { 
    return (
        <VStack spacing='32px' paddingBottom='100px' width='80%'>
            <VStack width='100%' alignItems={'flex-start'}>
                <Text as='b' fontSize='4xl'>Meet DistilBERT</Text>
                <Text fontSize='xl'>
                    DistilBERT is a streamlined version of BERT (Bidirectional Encoder Representations from Transformers), 
                    one of the most revolutionary models in natural language processing (NLP). 
                    Developed by researchers at Hugging Face, 
                    it maintains most of BERT's performance while being more efficient.
                </Text>
            </VStack>

            <VStack width='100%' alignItems={'flex-start'}>
                <Text as='b' fontSize='4xl'>How it works</Text>
                <Text fontSize='xl'>
                    Like BERT, DistilBERT is designed to understand the context of words in a sentence, but it's smaller and faster. 
                    It's achieved by distilling the knowledge of the larger BERT model into a smaller one, 
                    essentially compressing the information without significant loss of accuracy.
                </Text>
            </VStack>

            <VStack width='100%' alignItems={'flex-start'}>
                <Text as='b' fontSize='4xl'>Relevance to Sentiment Analysis</Text>
                <Text fontSize='xl'>
                    DistilBERT's capability to understand nuanced language makes it highly suitable for sentiment analysis. 
                    It doesn't just look at individual words but considers the overall context, which is crucial for accurately determining sentiment, 
                    especially in complex movie reviews.
                </Text>
            </VStack>
        </VStack>
    );
}

export default PredictionComponent;
