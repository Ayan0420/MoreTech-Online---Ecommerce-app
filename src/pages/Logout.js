import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../userContext";

export default function Logout() {
    localStorage.clear()

    const {unsetUser, setUser} = useContext(UserContext);

    unsetUser();

    //Placing 
    useEffect(() => {
      setUser({id: null})
      Swal.fire({
        title: 'Logout Successful',
        icon: 'success',
        confirmButtonColor: "#2c3e50",
        text: 'Login again to get more perks!'
    })
    });
    
  return (
    <Navigate to="/" />
  )
}
