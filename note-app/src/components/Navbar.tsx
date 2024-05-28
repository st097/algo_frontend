import React, {useContext, useMemo} from "react";
import  useLoginStore  from "../store/loginStore";
import { Box } from "@mui/material";
import { ThemeContext } from "../App";

interface INavbarProps {
    navbarTitle:string;
}

export default function Navbar({navbarTitle}:INavbarProps){
  const theme = useContext(ThemeContext);

  const {userFullName, userEmail, roles} = useLoginStore();
  

    return  <Box sx={{
        display: "block",
        width: "100%",
        margin: "0 0 50px 0",
        backgroundColor: theme === "dark" ? "#3f80b5" : "#07184a",
        color: theme === "dark" ? "#07184a" : "#3f80b5",
      }}>

          <ul style={{
            listStyleType:"none",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            }}>
            <li>
              <h1>{navbarTitle}</h1>
            </li>
            <li>
              <p><b>Name: </b>{userFullName || ""}</p>
            </li>
            <li>
              <p><b>Email: </b>{userEmail || ""}</p>
            </li>

            <ul style={{
            listStyleType:"none",
            display:"flex",
            flexDirection:"column",
            justifyContent:"normal"
            }}>
                <li>
                <h3>Roles:</h3>
                </li>
                {roles && roles.map((role, index) => (
                    <li key={index}>
                        <p>{role}</p>
                    </li>
                ))}
            </ul>
          </ul>
        </Box>
}