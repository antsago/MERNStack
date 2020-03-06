import React from 'react'
import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardContent: {
    flexGrow: 1
  }
}))

const UserItem = ({ user }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography>{user.givenName}</Typography>
          <Typography>{user.familyName}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserItem
