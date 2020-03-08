import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
require("dotenv").config();

// create the context
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);
const redirect_url_upon_authentication = "http://localhost:5000/#/Landing";
const redirect_url_upon_logout = "http://localhost:5000/";
// create a provider
export class Auth0Provider extends Component {
  // state = { message: "testing message here!" };
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
    user: null,
    login_uri: redirect_url_upon_authentication,
    logout_uri: redirect_url_upon_logout
  };
  config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: redirect_url_upon_authentication
  };
  componentDidMount() {
    this.initializeAuth0();
    // alert("env is" + JSON.stringify(process.env));
  }
  // initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    // const isAuthenticated = await auth0Client.isAuthenticated();
    // const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ auth0Client });
    if (window.location.search.includes("code=")) {
      return this.handleRedirectCallback();
    }
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });

    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    this.setState({ user, isAuthenticated: true, isLoading: false });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const {
      auth0Client,
      isLoading,
      isAuthenticated,
      user,
      login_uri,
      logout_uri
    } = this.state;
    const { children } = this.props;

    const configObject = {
      isLoading,
      isAuthenticated,
      user,
      login_uri,
      logout_uri,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      logout: (...p) => auth0Client.logout(...p)
    };

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
