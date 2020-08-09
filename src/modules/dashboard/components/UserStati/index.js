import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { options } from './chart';
import { instance } from 'utils';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestSales = (props) => {
  const { className, ...rest } = props;
  const [rows, setRows] = React.useState([]);
  const items = useSelector(({ items }) => items.rows);
  let labels = [];
  let datasets = {};

  rows.map((x) => {
    let batch = items.batches.find((xb) => xb.id === x.batchId);
    let batchLabel = batch ? batch.batchNameShort : '-NA-';
    let labelsIndex = labels.findIndex((xl) => xl == batchLabel);
    if (labelsIndex === -1) {
      labels.push(batchLabel);
      labelsIndex = labels.length - 1;
    }

    let accountStatus = items.accountStatus.find((xb) => xb.accountStatusId === x.accountStatus);
    let accountStatusLabel = accountStatus ? accountStatus.accountStatusLabel : '-NA-';
    if (!datasets[accountStatusLabel])
      datasets[accountStatusLabel] = {
        label: accountStatusLabel,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        data: new Array(rows.length),
      };
    datasets[accountStatusLabel].data.splice(labelsIndex, 0, x.userCount);
  });

  console.log('datasets', datasets);

  const classes = useStyles();

  React.useEffect(() => {
    instance.post('user/batchStati').then((rows) => setRows(rows));
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Student / Batch distribution" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={{
              labels: labels,
              datasets: Object.values(datasets),
            }}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

export default LatestSales;
