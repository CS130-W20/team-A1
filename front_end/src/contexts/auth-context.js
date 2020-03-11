import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
require("dotenv").config();

// create the context
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);
const redirect_url_upon_authentication = "http://localhost:5000/#/Landing";
const redirect_url_upon_logout = "http://localhost:5000";
// create a provider
const ifEnabled = false;
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
    domain: "dev-8b1qvmuz.auth0.com",
    client_id: "Um5MRF3nrB4VDaESH8jPtulGYFTR47kd",
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
    let configObject = {};
    if (ifEnabled) {
      configObject = {
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
    } else {
      configObject = {
        isLoading: false,
        isAuthenticated: true,
        user: { nickname: "jonathon", sub: "12345", picture: "/" },
        login_uri,
        logout_uri,
        loginWithRedirect: () => {
          console.log("logged in fake!");
        }
      };
    }

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    );
  }
}
