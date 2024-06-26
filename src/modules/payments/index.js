import React, { Component, useRef, Fragment, useState, useEffect } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import Layout from 'layouts/Main';

import { TableComp, CustomButton, FloatingButton } from 'components/common';

import Form from './components/Form';
import Filter from './components/Filter';
import { instance } from 'lib';
import { showMessage } from 'store/messages/actions';
import UserSingle from './single';
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

const statusFormatter = row =>{
  if( !row.status ) return  <Typography color="secondary" >PENDING</Typography>
    if( row.status === 'trial' ) return  (
      <React.Fragment>
        <Typography color="textSecondary" >TRIAL</Typography>
        <Typography>{isoToFormatted( row.trialDetails.expiresAt , 'D MMM YYYY' )}</Typography>
      </React.Fragment>
    )

return  (
      <React.Fragment>
        <Typography style={{
            color : row.status === 'active' ?  'green' : 'teal',
            fontWeight : row.status === 'active' ?  700 : 500
        }} >{row.status.toUpperCase()}</Typography>
        <Typography>{isoToFormatted( row.paymentExpiresAt , 'D MMM YYYY' )}</Typography>
      </React.Fragment>
    )
}

const cols = [
  { label: 'Name', key: 'user.name' , formatter : row => row.user.name },
  { label: 'Email', key: 'user.email',formatter : row => row.user.email },
  { label: 'AMOUNT', key: 'user.email',formatter : row => `${row.amount_paid} ${row.currency}` },
  { label: 'Date', key: 'createdAt' , formatter : row => isoToFormatted( row.createdAt , 'D MMM YYYY' ) }
];


const UserPage = () => {
  const classes = useStyles();
  const tableRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [showStati, setShowStati] = useState(false);
  const [row, setRow] = useState(null);
  const [where, setWhere] = useState({});
  //const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const fetchRows = () => tableRef && tableRef.current.fetchRows();

  useEffect(() => {
    fetchRows();
  }, [where]);
  

  const handleView = (row) => () => {
    setRow(null);
    setShowForm(false);
    setTimeout(() => {
      setRow(row);
      setShowForm(true);
    }, 100);
  };

  return (
    <div className={classes.root}>
      <Drawer
        anchor={'right'}
        open={showForm}
        style={{ padding: '10vW' }}
        onClose={() => {
          setShowForm(false);
          setRow(null);
        }}
      >
        <Form
          onSuccess={() => {
            fetchRows();
            setShowForm(false);
            setRow(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setRow(null);
          }}
          row={row}
        />
      </Drawer>
      <Drawer
        anchor={'right'}
        open={showStati}
        style={{ padding: '10vW' }}
        onClose={() => {
          setShowStati(false);
          setRow(null);
        }}
      >
        <UserSingle
          onCancel={() => {
            setShowStati(false);
            setRow(null);
          }}
          row={row}
        />
      </Drawer>
      <Filter onSuccess={(where) => setWhere(where)} />
      <TableComp
        where={where}
        ref={tableRef}
        cols={cols}
        API={API}
        DELETE_API={API}
        pKey={`id`}
        rowHightLighted={row ? row.id : null}
        handleView={handleView}
      />
    </div>
  );
};

export default () => (
  <Layout>
    <UserPage />
  </Layout>
);
