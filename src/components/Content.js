import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Catalog from "./Catalog";
import '../styles/Content.scss';
import { Route, Routes, Navigate } from "react-router";

function Content() { 
    return(
        <div className="page-content">
            <Grid
                templateAreas={`
                    "header"
                    "main"
                `}
                gridTemplateRows={'70px 100%'}
                height='100%'
            >
                <GridItem padding='16px' area={'header'}>
                    <Navbar />
                </GridItem>
                <GridItem overflow={'scroll'} area={'main'}>
                    <Routes>
                        <Route path="/catalog" element={<Catalog/>} />
                        <Route path="*" element={<Navigate to="/catalog" replace />} />
                    </Routes>                    
                </GridItem>
            </Grid>
        </div>
    );
}

export default Content;
