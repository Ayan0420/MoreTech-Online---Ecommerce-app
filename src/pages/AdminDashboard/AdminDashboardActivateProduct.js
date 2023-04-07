import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminDashboardActivateProduct() {

    const {productId} = useParams();
    const navigate = useNavigate()
    

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.response === true){
                Swal.fire({
                    title:"Successfully Activated Product",
                    icon: "success",
                    confirmButtonColor: "#0d6efd"
                });
                
            } else {
                Swal.fire({
                    title:"Something went wrong",
                    icon: "error",
                    text: "Please try again"
                });
            }
        })
    }, [])
    

  return (
    <Navigate to="/admin-all-products"/>
  )
}
