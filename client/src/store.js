import React, { createContext, useReducer } from "react";
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
  marketPictures: [],
  file: [],
  name: "",
  description: "",
  category: "",
  address: "",
  showEditDeleteButton: false,
  userLocation: {},
  locationError: null,
  isMarketFound: true,
  showLoginButton: true,
  logUserOut: false,
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
        uploadFiles,
        getUserProfile,
        getMarkets,
        getMarket,
        handleDelete,
        updateMarket,
        checkIsAdmin,
        locationAllowed,
        locationError,
        searchMarket,
        doLogout,
        addMarket,
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

  function locationAllowed({ coords }) {
    searchMarket({ latitude: coords.latitude, longitude: coords.longitude });
  }

  function locationError(error) {
    dispatch({
      type: "change",
      payload: error.message,
      field: "locationError",
    });
  }
  function uploadFiles(e) {
    let fileObj = [],
      fileArray = [];
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }

    dispatch({ type: "change", payload: e.target.files, field: e.target.name });
    dispatch({ type: "change", payload: fileArray, field: "marketPictures" });
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
        type: "change",
        payload: false,
        field: "authError",
      });
      dispatch({
        type: "change",
        payload: {},
        field: "authErrors",
      });
    } else {
      localStorage.setItem("token", response.data.data.bearerToken);
      dispatch({
        type: "change",
        payload: true,
        field: "authSuccessful",
      });
      dispatch({
        type: "change",
        payload: false,
        field: "authSuccessful",
      });
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
        type: "change",
        payload: false,
        field: "authError",
      });
      dispatch({
        type: "change",
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
        type: "change",
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

  async function addMarket() {
    const bearerToken = localStorage.getItem("token");
    const { name, description, category, address, file } = state;

    const data = new FormData();
    data.append("pictures", file);
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("address", address);
    data.append("isNew", "false");

    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_API_URL}/markets`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: bearerToken,
        },
      })
    );
    if (error) {
      dispatch({
        type: "change",
        payload: true,
        field: "isMarketAddedError",
      });
    } else {
      dispatch({
        type: "change",
        payload: response.data.data.message,
        field: "market",
      });
    }
  }

  async function updateMarket() {
    const bearerToken = localStorage.getItem("token");
    const {
      name,
      description,
      category,
      address,
      market,
      file,
      marketPictures,
    } = state;
    const payload = {
      name,
      description,
      category,
      address,
      ...market,
    };

    const blobFile = new Blob([file]); // kind of works and choses stream as content type of file (not request)
    const data = new FormData();
    data.append("pictures", blobFile);
    data.append("id", payload.id);
    data.append("name", payload.name);
    data.append("description", payload.description);
    data.append("category", payload.category);
    data.append("address", payload.address);
    data.append("images", payload.pictures);
    data.append("isNew", file.length > 0 ? "true" : "false");
    console.log(data, file);

    const [error, response] = await to(
      axios.patch(
        `${process.env.REACT_APP_API_URL}/markets`,
        {
          name,
          category,
          description,
          address,
          marketPictures,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
      dispatch({
        type: "change",
        payload: response.data.data.market,
        field: "market",
      });
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

  function checkIsAdmin() {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      dispatch({
        type: "change",
        payload: false,
        field: "showEditDeleteButton",
      });
    } else {
      dispatch({
        type: "change",
        payload: true,
        field: "showEditDeleteButton",
      });
      dispatch({
        type: "change",
        payload: false,
        field: "showLoginButton",
      });
    }
  }

  function doLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  async function searchMarket({ latitude, longitude }) {
    const { name, category } = state;
    const [error, response] = await to(
      axios.get(
        `${process.env.REACT_APP_API_URL}/search?name=${name}&category=${category}&latitude=${latitude}&longitude=${longitude}`
      )
    );

    if (error || !response) {
      dispatch({
        type: "change",
        payload: false,
        field: "isMarketFound",
      });
    } else {
      dispatch({
        type: "change",
        payload: response.data.data.markets,
        field: "markets",
      });
    }
  }
};

export { store, StateProvider };
