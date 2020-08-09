import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

function PaperComponent(props) {
  return <Paper {...props} />;
}

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { title, msg, onAccept, onCancel } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>{props.children}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{ minWidth: 400 }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title || 'Are you sure'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {msg || 'This coud not be revoked. Please confirm your action'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              onCancel && onCancel();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onAccept && onAccept();
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
