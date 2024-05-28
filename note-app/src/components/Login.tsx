import React, {useEffect, useState ,useContext} from "react";
import { ILoginRequest } from "../types/ILogin";
import  useLoginStore  from "../store/loginStore";
import Navbar from "./Navbar";
import {ThemeContext} from "../App";
//material ui
import Box from "@mui/material/Box";
import { Button, Container, Input, Typography } from "@mui/material";

interface IProps {
    title:string;
    userData?:ILoginRequest;
    handleFormData?(formData:ILoginRequest):void;
}

export default function Login({title, userData, handleFormData:handleFormDataProp}:IProps){
  const theme = useContext(ThemeContext);
  const btnStyle = {
    backgroundColor: theme === "dark" ? "#3f80b5" : "#07184a",
    color: theme === "dark" ? "#07184a" : "#3f80b5",
    }
  
  const {token, addRole} = useLoginStore();
  const[newRole, setNewRole] = useState<string>("");
  //set
  //you can use UUID to generate token
  let rand = function() {
    console.log("rand");
    return Math.random().toString(36).substr(2);
  };
  let newToken = function() {
      console.log("newToken");
      return rand() + rand();
  };

  //update token everytime user logs in
  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
  
  //set data
  const [formData, setFormData] = useState<ILoginRequest>(
        {
          name:"",
          phone: null,
          email: "",
          password: ""
        }
    )

  //handle input change
  const handleInputChange = (key:string, value:string|number)=>{
      setFormData({...formData, [key]:value})
  }

  const handleLogin =(data:ILoginRequest)=>{
      if(userData?.email === "" || userData?.password === ""){
          alert("Please fill in all fields")
          return
      }
      else if(userData?.email === data.email && userData.password === data.password){
          alert(`Login succesful! Welcome ${userData.name}!`)
          handleFormDataProp && handleFormDataProp(data)
          //update token
          useLoginStore.setState({
            token: newToken()
          });
      }
      else{
          alert("Invalid email or password")
      }     
  }

    return (
      <>
      <Navbar navbarTitle={title}/>
      <Container sx={{
          width:"100vw",
          height:"69vh",
          display:"flex",
          justifyContent:"center",
          gap:"1.5rem",
        }}>
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          gap:"1.5rem",
          width:"300px",
          textAlign:"center",
          m: '4'
        }}>
        
        <Box>
          <label htmlFor="emailLogin">Email: </label>
          <Input id="emailLogin" type="email" value={formData.email} onChange={(e)=> handleInputChange("email", e.target.value)}/>
        </Box>
        <Box>
          <label htmlFor="passwordLogin">Password: </label>
          <Input id="passwordLogin" type="password" value={formData.password} onChange={(e)=> handleInputChange("password", e.target.value)}/>
        </Box>

        <Button sx={btnStyle} variant="contained" onClick={() => handleLogin(formData)}>
          Login
        </Button>
        <Typography sx={{mt:3, mb:-3}}>Add a new role: </Typography>
        <Input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)}/>
        <Button sx={btnStyle} variant="contained" onClick={() => addRole(newRole)}>
          Add
        </Button>
        </Box>
      </Container>
      </>
    );
    }