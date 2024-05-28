import {useContext, useState} from "react";
import { ThemeContext } from "../App";
import { IRegisterRequest } from "../types/IRegister";
import  useLoginStore  from "../store/loginStore";
import Navbar from "./Navbar";
//material ui
import { Container, Box, Button, Input, Typography} from "@mui/material";


interface IRegisterProps {
    title: string;
    handleFormData?(formData:IRegisterRequest):void;
}

export default function Register({title, handleFormData:handleFormDataProp}:IRegisterProps){
  const theme = useContext(ThemeContext);
  const btnStyle = {
    backgroundColor: theme === "dark" ? "#3f80b5" : "#07184a",
    color: theme === "dark" ? "#07184a" : "#3f80b5",
  }
    const [formData, setFormData] = useState<IRegisterRequest>(
        {
            name:"",
            phone: null,
            email: "",
            password: "",
            dateOfBirth: "",
            isHuman: false
        }
    )

    const updateStoreData = (formData:IRegisterRequest) => {
      useLoginStore.setState({
        userFullName: formData.name,
        userEmail: formData.email,
      });
    }

    //handle input change
    const handleInputChange = (key:string, value:string|number|boolean)=>{
        setFormData({...formData, [key]:value})
    }

    //handle form data
    const handleFormData =(data:IRegisterRequest)=>{
        handleFormDataProp && handleFormDataProp(data)
        updateStoreData(data)
    }

 
    return <>
      <Navbar navbarTitle={title}/>
      <Container sx={{
        width:"100vw",
        height:"69vh",
        display:"flex",
        justifyContent:"center",
        mt:"0",
        gap:"1.5rem",
      }}>
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          gap:"1.5rem",
          width:"350px",
          textAlign:"center",
          m: '4'
        }}>
        
        <Box>
          <label htmlFor="fullName">Full name: </label>
          <Input id="fullName" type="text" value={formData.name} onChange={(e)=> handleInputChange("name", e.target.value)}/>
        </Box>
        <Box>
          <label htmlFor="email">Email: </label>
          <Input id = "email"type="email" value={formData.email} onChange={(e)=> handleInputChange("email", e.target.value)}/>
        </Box>
        <Box>
          <label htmlFor="phone">Tel number: </label>
          <Input id="phone" type="text" value={formData.phone || ""} onChange={(e)=> handleInputChange("phone", Number(e.target.value))}/>
        </Box>
        <Box>
          <label htmlFor="password">
            {/* <Typography variant="body1">Password: </Typography> */}
            Password: 
            </label>
          <Input id ="password" type="password" name="" value={formData.password} onChange={(e)=> handleInputChange("password", e.target.value)} />
        </Box>
        <Box>
          <label htmlFor="birthday">Date of birth: </label>
          <Input id ="birthday" type="datetime" name="" value={formData.dateOfBirth} onChange={(e)=> handleInputChange("dateOfBirth", e.target.value)} />
        </Box>
        <Box>
          <label htmlFor="human">Are you a human?</label>
          <input id="human" type="checkbox" onChange={(e)=> handleInputChange("isHuman", e.target.checked)}/>
        </Box>

        <Button sx={btnStyle} variant="contained" onClick={() => handleFormData(formData)}>
          Register
        </Button>
        </Box>
    </Container>
    </>
} 