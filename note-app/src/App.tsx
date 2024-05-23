import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import { ILoginRequest } from './types/ILogin';
import Register from './components/Register';
import { IRegisterRequest } from './types/IRegister';

function App() {

  const [isInfo, setInfo] = useState<boolean>(false)
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
    setInfo(true);
  }
 
  return (
    <div>
      <div >
        {
          isInfo ?
          <div>
            <h2>Name: {displayInfo.name}</h2>
            <h3>Phone: {displayInfo.phone}</h3>
            <h4>Email: {displayInfo.email}</h4>
          </div>
          : <div>NO DATA</div>
        }

        <Register title='Register component' handleFormData={handleRegisterData} />
        <Login title='Login component' name={displayInfo.name} email={displayInfo.email} password={displayInfo.password}/>
        
      </div>
    </div>
  );
}

export default App;
