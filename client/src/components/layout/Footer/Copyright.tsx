import React from 'react'
import { Typography } from '@material-ui/core'

const Copyright = () => (
  <Typography variant='body2' align='center'>
    {`Copyright © Antonio Sánchez Gómez ${new Date().getFullYear()}.`}
  </Typography>
)

export default Copyright
