import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';

export default (props) => {
  let { title, linkTo } = props;
  return (
    <Fragment>
      <Grid container>
        <Grid item style={{ flexGrow: 1 }}>
          <Typography>{title}</Typography>
        </Grid>
        {linkTo && (
          <Grid item>
            <Typography>
              <Link component={RouterLink} to="/">
                VIEW ALL{' '}
                <Typography style={{ marginLeft: 10, fontSize: 20, display: 'inline' }}>
                  {' '}
                  >>{' '}
                </Typography>
              </Link>
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider style={{ background: '#ddf1ee' }} />
    </Fragment>
  );
};
