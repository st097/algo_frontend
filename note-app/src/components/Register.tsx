import {useState} from "react";
import { IRegisterRequest } from "../types/IRegister";

interface IRegisterProps {
    title: string;
    handleFormData?(formData:IRegisterRequest):void;
}

export default function Register({title, handleFormData:handleFormDataProp}:IRegisterProps){
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

    //handle input change
    //-------------------------Studje kete, pse eshte [key]
    const handleInputChange = (key:string, value:string|number|boolean)=>{
        setFormData({...formData, [key]:value})
    }

    //handle form data
    const handleFormData =(data:IRegisterRequest)=>{
        handleFormDataProp && handleFormDataProp(data)
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
          <label htmlFor="fullName">Full name: </label>
          <input id="fullName" type="text" value={formData.name} onChange={(e)=> handleInputChange("name", e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input id = "email"type="email" value={formData.email} onChange={(e)=> handleInputChange("email", e.target.value)}/>
        </div>
        <div>
          <label htmlFor="phone">Tel number: </label>
          <input id="phone" type="number" value={formData.phone || ""} onChange={(e)=> handleInputChange("phone", Number(e.target.value))}/>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id ="password" type="password" name="" value={formData.password} onChange={(e)=> handleInputChange("password", e.target.value)} />
        </div>
        <div>
          <label htmlFor="birthday">Date of birth: </label>
          <input id ="birthday" type="datetime" name="" value={formData.dateOfBirth} onChange={(e)=> handleInputChange("dateOfBirth", e.target.value)} />
        </div>
        <div>
          <label htmlFor="human">Are you a human?</label>
          <input id="human" type="checkbox" onChange={(e)=> handleInputChange("isHuman", e.target.checked)}/>
        </div>

        <button onClick={() => handleFormData(formData)}>
          Register
        </button>
    </div>
} 