import React, {useState} from "react";
import { ILoginRequest } from "../types/ILogin";

interface IProps {
    title: string;
    name?: string;
    email?: string;
    password?: string;
    handleFormData?(formData:ILoginRequest):void;
}

export default function Login({title, name, email, password, handleFormData:handleFormDataProp}:IProps){
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
        if(email === "" || password === ""){
            alert("Please fill in all fields")
            return
        }
        else if(email === data.email && password === data.password){
            alert(`Login succesful! Welcome ${name}!`)
            handleFormDataProp && handleFormDataProp(data)
        }
        else{
            alert("Invalid email or password")
        }

        
    }
    return <div style={{
        display:"flex",
        flexDirection:"column",
        gap:"1.5rem",
        width:"350px",
        margin:"50px",
        textAlign:"center"
      }}>
        <h1>{title}</h1>

        <div>
          <label htmlFor="emailLogin">Email: </label>
          <input id = "emailLogin"type="email" value={formData.email} onChange={(e)=> handleInputChange("email", e.target.value)}/>
        </div>
        <div>
          <label htmlFor="passwordLogin">Password: </label>
          <input id="passwordLogin" type="password" value={formData.password} onChange={(e)=> handleInputChange("password", e.target.value)}/>
        </div>

        <button onClick={() => handleLogin(formData)}>
          Login
        </button>
    </div>
}