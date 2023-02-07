import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import UserContext from './context/userContext';
import {useRoutes} from "react-router-dom"

function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);
  const routing = useRoutes(routes);



  //My code
  

  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </UserContext.Provider> 
  );
};

export default App;
