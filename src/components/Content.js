import React from "react";
import { Flex, VStack, Text, Box, Spacer, Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./Navbar";
import '../styles/Content.scss';

function Content() { 
    return(
        <Grid
            templateAreas={`
                "header header"
                "main main"
                "footer footer"
            `}
        >
        <GridItem padding='16px' area={'header'}>
            <Navbar className="navbar"/>
        </GridItem>
        <GridItem bg='green.300' area={'main'}>
            Main
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
            Footer
        </GridItem>
        </Grid>
    );
}

export default Content;
