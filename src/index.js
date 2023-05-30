import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { apitimeout } from './components/api_timeout';
import ErrorToast from './components/ErrorToast';
import Loader from './components/Loading';
import App from './containers/App';
import { Provider } from "react-redux";
import { store } from "./containers/redux/store";
import './assets/styles/style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionSnack: false,
      errorSnack: false,
      togglePerm: '',
      errorSnackTwo: false,
      toggleApp: '',
      loading: false
    }
  }

  componentDidMount() {
    let url = window.location.href;
    let host = url.split('/content-svc')[0];
    let paramUrl = url.split("sessionId=")[1];
    let authToken = null;
    let sourceHost = null;

    if (typeof paramUrl !== "undefined") {
      authToken = paramUrl.split("&source=")[0];
      sourceHost = paramUrl.split("&source=")[1];
    }
    
    if (localStorage.getItem('userPermission') === null || (localStorage.getItem('token') !== authToken && authToken !== null)) {

      if (typeof authToken !== "undefined" && authToken !== null) {
        localStorage.setItem('token', authToken);
      }
      
      this.setState({ loading: true });
      apitimeout(pendingTimeout, fetch(host + templateAPI + '/permissions', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "X-Requested-With": "XMLHttpRequest",
          [AuthKey]: authToken
        }
      })).then(response => {
        if (response.status == 200) {
          this.setState({ toggleApp: true, loading: false });
          return response.json();
        }
        else if (response.status == 401) {
          this.setState({ permissionSnack: true, toggleApp: false, loading: false });
          setTimeout(() => {
            this.setState({
              permissionSnack: false
            });
            if (localStorage.getItem('source_host') === 'partner') {
              window.location.replace(host + partnerLogoutUrl);
            }
            else {
              window.location.replace(host + catalogHost);
            }
          }, timeout);
        }
        else {
          this.setState({ toggleApp: false });
          throw Error(response.statusText);
        }
      })
        .then(result => {
          if (result) {
            localStorage.setItem('userPermission', result.roles);
            if (result.externalUser !== null && result.externalUser !== "") {
              localStorage.setItem('userManufacturer', result.externalUser.marketeer_name);
            }
            if (localStorage.getItem('userPermission').includes(creatorPermission)) {
              this.setState({ togglePerm: true });
            }
            else {
              this.setState({ togglePerm: false });
            }
          }
          else {
            this.setState({ errorSnackTwo: true });
            setTimeout(() => {
              this.setState({
                errorSnackTwo: false
              })
            }, timeout);
          }
        })
        .catch((error) => {
          this.setState({ errorSnack: true, loading: false });
          setTimeout(() => {
            this.setState({
              errorSnack: false
            })
          }, timeout);
          console.log('Looks like there was a problem in fetching permissions \n', error);
        });
    }

    if (typeof sourceHost !== "undefined" && sourceHost !== null) {
      localStorage.setItem('source_host', sourceHost);
    }

    if (localStorage.getItem('token') === null) {
      if (localStorage.getItem('source_host') === 'partner') {
        window.location.replace(host+ partnerLogoutUrl);
      }
      else {
        window.location.replace(host+ catalogHost);
      }
    }

    if (localStorage.getItem('userPermission') && localStorage.getItem('token'))
      this.setState({ toggleApp: true });
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loader />}
        {this.state.toggleApp && 
        <Provider store={store}>
          <BrowserRouter>
            <App togglePerm={this.state.togglePerm} />
          </BrowserRouter>
        </Provider>}
        {this.state.errorSnack && <ErrorToast message="Error in Processing" />}
        {this.state.errorSnackTwo && <ErrorToast message="Error in Processing" />}
        {this.state.permissionSnack && <ErrorToast message="User is not Authorized!" />}
      </div>
    );
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

  palette: {
    primary: {
      light: "#757ce8",
      main: "#fff",
      dark: "#002884",
      contrastText: "#fff"
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: ["ProximaNova-Regular"],
      type: "light"
    }
  }
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </JssProvider>,
  document.querySelector('#app-root'),
);