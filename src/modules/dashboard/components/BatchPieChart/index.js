import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Card, CardHeader, CardContent, IconButton, Divider, Typography } from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import theme from 'layouts/theme';
import { instance } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  chartContainer: {
    position: 'relative',
    height: '300px',
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const UsersByDevice = (props) => {
  const { className, ...rest } = props;
  const [rows, setRows] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const items = useSelector(({ items }) => items.rows);

  let labels = [];
  let data = [];
  let backgroundColor = [];
  rows.map((x) => {
    let batch = items.batches.find((xb) => xb.id === x.batchId);
    let batchLabel = batch ? batch.batchNameShort : '-NA-';
    let labelsIndex = labels.findIndex((xl) => xl == batchLabel);
    if (labelsIndex === -1) {
      labels.push(batchLabel);
      labelsIndex = labels.length - 1;
      data.push(x.userCount);
      backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    } else {
      data[labelsIndex] += x.userCount;
    }
  });

  const dataChart = {
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
      },
    ],
    labels,
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
    },
  };

  React.useEffect(() => {
    instance.post('user/batchStati').then((rows) => setRows(rows));
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Student By Batch" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={dataChart} options={options} />
        </div>
        <div className={classes.stats}>
          {labels.map((x, i) => (
            <div className={classes.device} key={x}>
              <Typography variant="body1">{x}</Typography>
              <Typography style={{ color: backgroundColor[i] }} variant="h2">
                {data[i]}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string,
};

export default UsersByDevice;
