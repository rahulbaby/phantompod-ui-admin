import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import { isMobile } from 'lib/functions';

export default (props) => {
  let { title, subTitle } = props;

  return (
    <div style={{ display: 'flex' }}>
      <Box p={4}>
        <img
          src={`https://image.flaticon.com/icons/svg/2456/2456761.svg`}
          style={{ width: isMobile() ? 50 : 100 }}
        />
      </Box>
      <Box style={{ margin: 'auto', flexGrow: 1 }}>
        <Typography variant="subtitle1" color="primary">
          {title || 'Nothing in the list Now!'}
        </Typography>
        <Typography variant="body1" color="secondary">
          {subTitle || 'New items added will come here'}
        </Typography>
      </Box>
    </div>
  );

  return (
    <Box p={4}>
      <Grid container spacing={16}>
        <Grid item xs={3}>
          <img
            src={`https://image.flaticon.com/icons/svg/2456/2456761.svg`}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box style={{ margin: 'auto' }} pt={6}>
            <Typography variant={isMobile() ? `h5` : `h4`}>
              {title || 'Nothing in the list Now!'}
            </Typography>
            <Typography variant={isMobile() ? `span` : `h5`}>
              {subTitle || 'New items added will come here'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
