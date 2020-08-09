import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const UserForm = (props) => {
  const classes = useStyles();
  const { children, onSubmit, card, ...rest } = props;
  const ContentWrapper = card ? Paper : 'div';

  return (
    <ContentWrapper className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}
        {...rest}
      >
        {children}
      </form>
    </ContentWrapper>
  );
};

export default UserForm;
