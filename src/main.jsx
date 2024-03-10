import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store.js";
import theme from "./utils/theme.js";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <App/>
          </Provider>
      </ThemeProvider>
  </React.StrictMode>,
)
