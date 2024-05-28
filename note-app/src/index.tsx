import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { ThemeContext } from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#07184a',
    },
    secondary: {
      main: '#3f80b5',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //strict mode - is a tool for highlighting potential problems in an application
  //it renders components twice and checks for any side effects
  <React.StrictMode>
    <ThemeProvider theme={materialTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
