import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    zIndex: 2,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[900],
    },
  },
}));

export default function FloatingActionButton({ onClick }) {
  const classes = useStyles();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <React.Fragment>
      <Zoom
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab className={classes.fab} color="secondary" onClick={() => onClick && onClick()}>
          <AddIcon />
        </Fab>
      </Zoom>
    </React.Fragment>
  );
}
