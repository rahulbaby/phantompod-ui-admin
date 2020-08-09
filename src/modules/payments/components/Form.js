import React, { Component, Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const API = 'user';

const UserForm = ({row}) => {
  
  if( !row ) return null

  return (
    <div style={{maxWidth:300}} >
      <Typography align="center" color="primary" variant="h2" >META</Typography>
     <List>
       {Object.keys(row.meta).map(x=>{
         let val = row.meta[x]
         let isString = typeof val === 'string'
         return <ListItem divider>{`${x} - ${val}`}</ListItem>
       })}
      </List>
    </div>
  );
};

const mapStateToProps = ({ items }) => ({
  batches: items.rows.batches,
  accountStatusRows: items.rows.accountStatus,
});

export default UserForm
