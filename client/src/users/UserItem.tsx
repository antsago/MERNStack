import React from 'react'
import {
  makeStyles,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography
} from '@material-ui/core'
import { User } from '../utils'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardContent: {
    flexGrow: 1
  }
}))

const UserItem = ({ user, onClick }: { user: User; onClick?: () => void }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardActionArea onClick={onClick} data-testid='user-item'>
          <CardContent className={classes.cardContent}>
            <Typography>{user.givenName}</Typography>
            <Typography>{user.familyName}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default UserItem
