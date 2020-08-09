import React, { Fragment, Component, useEffect, useState } from 'react';
import { LoaderTable } from 'components/loaders';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoubleArrow from '@material-ui/icons/DoubleArrow';

import { instance } from 'utils';
import ConfirmButton from './ConfirmButton';
import EmptyList from './EmptyList';

class TableCom extends Component {
  state = {
    rowsPerPage: this.props.rowsPerPage || 10,
    loading: false,
    data: null,
    page: 1,
    error: false,
    rowHightLighted: this.props.rowHightLighted || null,
  };

  componentDidMount = () => this.fetchRows();

  fetchRows = () => {
    const { page, rowsPerPage } = this.state;
    let { where } = this.props;
    let offset = page ? page * rowsPerPage : 0;
    let params = { options : { page, limit: rowsPerPage } , query : where  }
    this.setState({ loading: true });
    instance.get(this.props.API, { params }).then((data) => {
      this.setState({ loading: false, data });
    });
  };

  renderActions = (row) => {
    const { onEditClick, handleDelete, handleView } = this.props;

    return (
      <TableCell align="right" style={{ minWidth: 200 }}>
        {handleView && (
          <IconButton style={{ padding: 0, marginRight: 10 }} onClick={handleView(row)}>
            <DoubleArrow color="primary" />
          </IconButton>
        )}
        {onEditClick && (
          <IconButton style={{ padding: 0, margin: 0 }} onClick={onEditClick(row)}>
            <EditIcon color="secondary" />
          </IconButton>
        )}
        {handleDelete && (
          <ConfirmButton onAccept={handleDelete(row)}>
            <DeleteIcon style={{ color: 'red' }} />
          </ConfirmButton>
        )}
      </TableCell>
    );
  };

  render() {
    const { caption, cols, classes, onEditClick } = this.props;
    let { rowsPerPage, page, data, loading, rowHightLighted } = this.state;

    const firstLoadDone = data && data.docs && data.docs !== undefined;
    if (loading || !firstLoadDone) return <LoaderTable />;

    const {  docs :rows, total } = data;
    const colLength = cols.length;
    const _tHeads = [];

    cols.map((x, i) => {
      _tHeads.push(<TableCell key={i.toString()}>{x.label}</TableCell>);
    });

    const getCellVal = (x, i) => {
      return cols[i].formatter ? cols[i].formatter(x) : x[cols[i].key];
    };

    return (
      <div style={{ marginBottom: 120 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            {caption && <caption>{caption}</caption>}
            <TableHead style={{ background: 'rgb(244, 237, 253)' }}>
              <TableRow>
                {_tHeads}
                <TableCell key="actions"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 && (
                <TableRow key={`empty`}>
                  <TableCell colspan={cols.length + 2}>
                    <EmptyList />
                  </TableCell>
                </TableRow>
              )}
              {rows.map((row, rKey) => {
                return (
                  <TableRow
                    key={rKey}
                    style={{
                      background:
                        row[this.props.pKey] == this.props.rowHightLighted
                          ? 'rgba(244, 179, 54, 0.04)'
                          : '#fff',
                    }}
                  >
                    {Array(colLength)
                      .fill()
                      .map((i, x) => (
                        <TableCell key={x.toString()}>{getCellVal(row, x)}</TableCell>
                      ))}
                    {this.renderActions(row)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.total}
          rowsPerPage={rowsPerPage}
          page={data.page-1}
          onChangePage={(event, page) => this.setState({ page : page +1 }, this.fetchRows)}
          onChangeRowsPerPage={(e) =>
            this.setState({ page: 1, rowsPerPage: parseInt(e.target.value, 10) }, this.fetchRows)
          }
        />
      </div>
    );
  }
}

const styles = {
  table: {
    minWidth: 650,
  },
};

export default withStyles(styles)(TableCom);
