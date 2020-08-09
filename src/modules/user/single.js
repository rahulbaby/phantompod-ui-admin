import React, { Component, useRef, Fragment, useState, useEffect } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import { TableComp } from 'components/common';

import { instance } from 'lib';
import { showMessage } from 'store/messages/actions';
import { isoToFormatted } from 'utils/functions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const API = 'admin/payments';

const selectItem = createSelector((state) => state.items.rows);

const cols = [
  { label: 'AMOUNT', key: 'user.email',formatter : row => `${row.amount_paid} ${row.currency}` },
  { label: 'Date', key: 'createdAt' , formatter : row => isoToFormatted( row.createdAt , 'D MMM YYYY' ) }
];


const UserPaymants = ({row}) => {
	if( !row ) return null
	const tableRef = useRef(null);
  const where = {
  	user : row.id
  }
  const fetchRows = () => tableRef && tableRef.current.fetchRows();

  useEffect(() => {
    fetchRows();
  }, [where]);

  return <div style={{padding:20}} >
  <Typography align="center" color="primary" variant="h4" >{`${row.name}`}</Typography>
  <TableComp
        where={where}
        ref={tableRef}
        cols={cols}
        API={API}
        pKey={`id`}
      />
  </div>
};

export default UserPaymants
