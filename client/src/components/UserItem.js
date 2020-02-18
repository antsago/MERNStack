import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const UserItem = props => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.image}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.heading}
          </Typography>
          <Typography>
            {props.content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserItem;