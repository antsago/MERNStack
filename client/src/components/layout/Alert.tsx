import React from 'react';
import { connect } from 'react-redux'
import { Snackbar, IconButton, Slide } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { dismissAlert, shownAlert } from '../../utils'

export const Alert = ({ alert, onDismiss }:
  { alert?: { id: number, message: string }, onDismiss: () => void }
) => !!alert ? (
  <Snackbar
    key={alert.id}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    TransitionComponent={props => <Slide {...props} direction="left" />}
    autoHideDuration={6000}
    onClose={onDismiss}
    message={alert.message}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={onDismiss}>
        <CloseIcon fontSize="small" />
      </IconButton>
    }
    open
  />
) : null

const mapStateToProps = state => ({
  alert: shownAlert(state),
})

const mapDispatchToProps = dispatch => ({
  onDismiss: () => dispatch(dismissAlert()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)