import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {
  Dashboard,
  Group,
  Receipt,
  Settings,
  PowerSettingsNew,
} from '@material-ui/icons';

import { singOut } from 'modules/auth/actions';

const LinkCustom = ({ label, to, linkIcon, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem selected={match ? true : false} button color="primary" component={renderLink}>
      <ListItemIcon>{linkIcon}</ListItemIcon>
      <ListItemText primary={`${label}`} />
    </ListItem>
  );
};

export const MainListItems = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <LinkCustom to="/payments" label="Payments" linkIcon={<Receipt />} />
      <LinkCustom to="/users" label="Users" linkIcon={<Group />} />
      <LinkCustom to="/settings" label="Settings" linkIcon={<Settings />} />
      <ListItem
        button
        color="primary"
        onClick={() => {
          dispatch(singOut());
        }}
      >
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText primary={`Log Out`} />
      </ListItem>
    </div>
  );
};

export const secondaryListItems = null;
