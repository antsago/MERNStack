import React from "react"
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
  Button,
} from "@material-ui/core"
import { User } from "../../utils"

const UserItem = ({
  user,
  onUpdate,
  onDelete,
}: {
  user: User
  onUpdate?: () => void
  onDelete?: () => void
}) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardActionArea onClick={onUpdate} data-testid="user-item">
        <CardContent>
          <Typography variant="h5">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {user.givenName} {user.familyName}
          </Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="text" color="primary" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="text" color="primary" onClick={onUpdate}>
          Update
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

export default UserItem
