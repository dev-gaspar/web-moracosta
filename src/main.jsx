import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { MantineProvider, createTheme } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import './index.css'

import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: "red",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
      >
        <App />
        <Toaster position="bottom-center" reverseOrder={false} toastOptions={{
          style: {
            color: '#fff',
            background: '#231f20',
          },
        }} /></MantineProvider>
    </Provider>
  </React.StrictMode>,
)
