import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import configureStore, { history } from 'store';
import AppRouter from 'nav/routes';
import './assets/scss/index.scss';
import theme from 'layouts/theme';

let { store, persistor } = configureStore();

const theme_ = createMuiTheme({
  palette: {
    primary: {
      light: '#9dc2c8',
      main: COLOR_PRIMARY,
      dark: '#204959',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb233',
      main: COLOR_SECONDARY,
      dark: '#b26f00',
      contrastText: '#fff',
    },
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Fragment>
                <AppRouter />
              </Fragment>
            </ThemeProvider>
          </PersistGate>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
