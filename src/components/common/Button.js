import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormButton(props) {
  const classes = useStyles();
  const { label, variant, color, size, loading, isLoading, onClick, ...rest } = props;
  const buttonIsLoading = loading || isLoading || false;
  return (
    <Button
      variant={variant || 'outlined'}
      color={color || 'primary'}
      size={size || 'medium'}
      disabled={buttonIsLoading}
      onClick={() => onClick && onClick()}
    >
      {label || 'Submit'}
    </Button>
  );
}
