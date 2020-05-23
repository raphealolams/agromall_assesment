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
  files: [],
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
  isMarketAdded: false,
  isMarketUpdateError: false,
  showSpinner: false,
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

  function dispatchSpinner() {
    dispatch({
      type: "change",
      payload: true,
      field: "showSpinner",
    });
  }

  function noSpinnerDispatch() {
    dispatch({
      type: "change",
      payload: false,
      field: "showSpinner",
    });
  }

  function setDispatchValue(value, field) {
    dispatch({
      type: "change",
      payload: value,
      field: field,
    });
  }

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
      fileArray = [],
      files = [];
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
      files.push(fileObj[0][i]);
    }

    dispatch({ type: "change", payload: files, field: "files" });
    dispatch({ type: "change", payload: fileArray, field: "marketPictures" });
  }

  async function handleLogin() {
    const { email, password } = state;
    dispatchSpinner();
    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password,
      })
    );

    noSpinnerDispatch();
    if (error) {
      setDispatchValue(true, "authError");
      setDispatchValue(error.response.data, "authErrors");
      setDispatchValue(false, "authError");
      setDispatchValue({}, "authErrors");
    } else {
      localStorage.setItem("token", response.data.data.bearerToken);
      setDispatchValue(true, "authSuccessful");
      setDispatchValue(false, "authSuccessful");
    }
  }

  async function handleSignup() {
    const { email, password, firstName, lastName, confirmPassword } = state;
    noSpinnerDispatch();
    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      })
    );

    noSpinnerDispatch();
    if (error) {
      setDispatchValue(error.response.data, "authErrors");
      setDispatchValue(true, "authError");
      setDispatchValue({}, "authErrors");
      setDispatchValue(false, "authError");
      return;
    } else {
      localStorage.setItem("token", response.data.data.bearerToken);
      setDispatchValue(true, "authSuccessful");
      setDispatchValue(false, "authSuccessful");
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
      setDispatchValue(response.data.data.user, "user");
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
      setDispatchValue(response.data.data.markets, "markets");
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
      setDispatchValue(true, "isMarketDeletedError");
      setDispatchValue(false, "isMarketDeletedError");
    } else {
      setDispatchValue(response.data.data.market, "market");
    }
  }

  async function addMarket() {
    const bearerToken = localStorage.getItem("token");
    dispatchSpinner();
    const { name, description, category, address, files } = state;

    const data = new FormData();

    for (var x = 0; x < files.length; x++) {
      data.append("pictures", files[x]);
    }
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("address", address);
    data.append("isNew", "false");

    const [error, response] = await to(
      axios({
        url: `${process.env.REACT_APP_API_URL}/markets`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: bearerToken,
        },
      })
    );

    noSpinnerDispatch();
    if (error) {
      setDispatchValue(true, "isMarketAddedError");
      setDispatchValue(false, "isMarketAddedError");
    } else {
      setDispatchValue(true, "isMarketAdded");
      setDispatchValue(false, "isMarketAdded");
      setDispatchValue("", "name");
      setDispatchValue("", "category");
      setDispatchValue("", "description");
      setDispatchValue("", "address");
      setDispatchValue([], "marketPictures");
    }
  }

  async function updateMarket() {
    dispatchSpinner();
    const bearerToken = localStorage.getItem("token");
    const { name, description, category, address, files, market } = state;

    const data = new FormData();
    for (var x = 0; x < files.length; x++) {
      data.append("pictures", files[x]);
    }
    data.append("id", market.id);
    data.append("name", name.length > 0 ? name : market.name);
    data.append(
      "description",
      description.length > 0 ? description : market.description
    );
    data.append("category", category.length > 0 ? category : market.category);
    data.append("address", address.length > 0 ? address : market.address);

    const [error, response] = await to(
      axios({
        url: `${process.env.REACT_APP_API_URL}/markets`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: bearerToken,
        },
      })
    );
    noSpinnerDispatch();
    if (error) {
      setDispatchValue(true, "isMarketUpdateError");
      setDispatchValue(false, "isMarketUpdateError");
    } else {
      setDispatchValue(response.data.data.market, "market");
      setDispatchValue(true, "isMarketAdded");
      setDispatchValue(false, "isMarketAdded");
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
      setDispatchValue(true, "isMarketDeletedError");
      setDispatchValue(false, "isMarketDeletedError");
    } else {
      const newMarkets = markets.filter(
        (market) => market.id !== marketToDelete
      );

      setDispatchValue(true, "isMarketDeleted");
      setDispatchValue(false, "isMarketDeleted");

      setDispatchValue({}, "market");
      setDispatchValue(newMarkets, "markets");
    }
  }

  function checkIsAdmin() {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) {
      setDispatchValue(false, "showEditDeleteButton");
      setDispatchValue(true, "showLoginButton");
    } else {
      setDispatchValue(true, "showEditDeleteButton");
      setDispatchValue(false, "showLoginButton");
    }
  }

  function doLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  async function searchMarket({ latitude, longitude }) {
    dispatchSpinner();
    const { name, category } = state;
    const [error, response] = await to(
      axios.get(
        `${process.env.REACT_APP_API_URL}/search?name=${name}&category=${category}&latitude=${latitude}&longitude=${longitude}`
      )
    );
    noSpinnerDispatch();
    if (error || !response) {
      setDispatchValue(false, "isMarketFound");
    } else {
      setDispatchValue(response.data.data.markets, "markets");
      setDispatchValue("", "name");
      setDispatchValue("", "category");
    }
  }
};

export { store, StateProvider };
