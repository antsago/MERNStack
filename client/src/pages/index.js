import React from 'react';
import { Grid } from '@material-ui/core';
import { Layout, UserItem } from '../components';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Index = () => (
  <Layout>
    <Grid container spacing={4}>
      {cards.map(card => (
        <UserItem
          key={card}
          image="https://source.unsplash.com/random"
          heading="Heading"
          content="This is a media card. You can use this section to describe the content."
        />
      ))}
    </Grid>
  </Layout>
);

export default Index;
