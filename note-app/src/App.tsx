import React, { useState, useContext, createContext} from 'react';
import Login from './components/Login';
import { ILoginRequest } from './types/ILogin';
import Register from './components/Register';
import { IRegisterRequest } from './types/IRegister';
//material ui
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeContext = React.createContext("light");

function App() {
  const [theme, setTheme] = useState('light');

  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(true)

  const [displayInfo, setDisplayInfo] = useState<ILoginRequest>(
    {
      name:"",
      phone: null,
      email: "",
      password: ""
    }
  )

  const handleRegisterData = (data:IRegisterRequest) => {
    setDisplayInfo({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password
    });
  }
 

  return (
    <ThemeContext.Provider value={theme}>

      <Box sx={{
        bgcolor: theme === "dark" ? "#07184a" : "#3f80b5",
        color: theme === "dark" ? "#dadce3" : "#07184a",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          pt: 2,
          pl: 2,
        }}>
          <Button style={{backgroundColor: "#07184a"}} variant="outlined" color="secondary" onClick={()=>setIsRegisterPage(true)}>Register</Button>
          <Button style={{backgroundColor: "#3f80b5"}} variant="outlined" color="primary" onClick={()=>setIsRegisterPage(false)}>Login</Button>
          <IconButton style={{backgroundColor: "#3f80b5"}} onClick={() =>  setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <DarkModeIcon />
          </IconButton>
        </Box>
        
        {isRegisterPage 
          ? <Register title='Register component' handleFormData={handleRegisterData} />
          : <Login title='Login component' userData={displayInfo}/>
        }
      </Box>

    </ThemeContext.Provider>
  );
}

export default App;
export { ThemeContext };