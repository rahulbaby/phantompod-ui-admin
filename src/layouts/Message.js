import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { clearMessage } from 'store/messages/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const Message = ({ item }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(clearMessage(item.id)), 4000);
  });

  return (
    <Alert severity={item.severity} onClose={() => dispatch(clearMessage(item.id))}>
      {item.text}
    </Alert>
  );
};

export default function ActionAlerts() {
  const classes = useStyles();
  const messages = useSelector(({ messages }) => messages.rows);

  return (
    <div className={classes.root}>
      {messages.map((x, i) => (
        <Message item={x} key={i} />
      ))}
    </div>
  );
}
