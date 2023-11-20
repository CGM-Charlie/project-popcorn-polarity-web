import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Catalog from "./Catalog";
import MovieDetail from "./MovieDetail";
import '../styles/Content.scss';
import { Route, Routes, Navigate } from "react-router";
import PredictionComponent from "./ModelTester";

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
                        <Route path="/home" element={<Catalog />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/model-test" element={<PredictionComponent />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>                    
                </GridItem>
            </Grid>
        </div>
    );
}

export default Content;
