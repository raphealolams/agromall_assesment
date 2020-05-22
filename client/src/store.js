import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import to from "await-to-js";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
  user: {},
  authErrors: {},
  authError: false,
  authSuccessful: false,
  markets: [],
  market: {},
  isMarketDeleted: false,
  isMarketDeletedError: false,
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ component }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "show loader":
        return { ...state, loading: true };

      case "hide loader":
        return { ...state, loading: false };

      case "update state":
        return { ...state, state: action.payload };

      case "check user":
        return { ...state, checked: true };

      case "change":
        return { ...state, [action.field]: action.payload };

      case "clear error":
        return { ...state, [action.field]: action.payload };

      default:
        return state;
    }
  }, initialState);

  return (
    <Provider
      value={{
        state,
        dispatch,

        handleLogin,
        handleSignup,
        onChangeInput,
        getUserProfile,
        getMarkets,
        getMarket,
        handleDelete,
      }}
    >
      {component}
    </Provider>
  );

  function onChangeInput(e) {
    let field = e.target.name;
    let value = e.target.value;
    dispatch({ type: "change", payload: value, field: field });
  }

  async function handleLogin() {
    const { email, password } = state;

    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password,
      })
    );

    if (error) {
      dispatch({
        type: "change",
        payload: error.response.data,
        field: "authErrors",
      });
      dispatch({
        type: "change",
        payload: true,
        field: "authError",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "authError",
      });
      dispatch({
        type: "clear error",
        payload: {},
        field: "authErrors",
      });
    } else {
      dispatch({
        type: "change",
        payload: true,
        field: "authSuccessful",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "authSuccessful",
      });
      localStorage.setItem("token", response.data.data.bearerToken);
    }
  }

  async function handleSignup() {
    const { email, password, firstName, lastName, confirmPassword } = state;

    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      })
    );

    if (error) {
      dispatch({
        type: "change",
        payload: error.response.data,
        field: "authErrors",
      });
      dispatch({
        type: "change",
        payload: true,
        field: "authError",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "authError",
      });
      dispatch({
        type: "clear error",
        payload: {},
        field: "authErrors",
      });
    } else {
      dispatch({
        type: "change",
        payload: true,
        field: "authSuccessful",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "authSuccessful",
      });
      localStorage.setItem("token", response.data.data.bearerToken);
    }
  }

  async function getUserProfile() {
    const bearerToken = localStorage.getItem("token");

    const [error, response] = await to(
      axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    if (error) dispatch({ type: "hide loader" });
    else {
      dispatch({
        type: "change",
        payload: response.data.data.user,
        field: "user",
      });
    }
  }

  async function getMarkets() {
    const bearerToken = localStorage.getItem("token");
    const [error, response] = await to(
      axios.get(`${process.env.REACT_APP_API_URL}/markets`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );

    if (error) dispatch({ type: "hide loader" });
    else {
      dispatch({
        type: "change",
        payload: response.data.data.markets,
        field: "markets",
      });
    }
  }

  async function getMarket(id) {
    const bearerToken = localStorage.getItem("token");
    const [error, response] = await to(
      axios.get(`${process.env.REACT_APP_API_URL}/markets/${id}`, {
        headers: {
          Authorization: bearerToken,
        },
      })
    );
    if (error) {
      dispatch({
        type: "change",
        payload: true,
        field: "isMarketDeletedError",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "isMarketDeletedError",
      });
    } else {
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
    }
  }

  async function handleDelete(id) {
    const bearerToken = localStorage.getItem("token");
    const { market, markets } = state;
    const marketToDelete = Object.keys(market).length > 0 ? market.id : id;

    const [error, response] = await to(
      axios.delete(
        `${process.env.REACT_APP_API_URL}/markets/${marketToDelete}`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      )
    );

    if (error) {
      dispatch({
        type: "change",
        payload: true,
        field: "isMarketDeletedError",
      });
      dispatch({
        type: "clear error",
        payload: false,
        field: "isMarketDeletedError",
      });
    } else {
      const newMarkets = markets.filter(
        (market) => market.id !== marketToDelete
      );

      dispatch({
        type: "change",
        payload: true,
        field: "isMarketDeleted",
      });

      dispatch({
        type: "change",
        payload: false,
        field: "isMarketDeleted",
      });

      dispatch({
        type: "change",
        payload: {},
        field: "market",
      });

      dispatch({
        type: "change",
        payload: newMarkets,
        field: "markets",
      });
    }
  }
};

export { store, StateProvider };
