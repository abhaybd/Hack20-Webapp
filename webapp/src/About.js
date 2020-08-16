import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: inline-block;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export const About = () => (
  <GridWrapper>
    <p>In response to the Covid-19 pandemic, we wanted to create an app that would allow
    individuals to be more aware of populated areas. We designed an app that would gather user
          location and generate a heatmap to notify users of densely populated areas. </p>
  </GridWrapper>
)