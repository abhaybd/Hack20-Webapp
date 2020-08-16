import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: inline-block;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export const Home = () => (
  <GridWrapper>
    <p>University of Washington Heatmap</p>
  </GridWrapper>
)