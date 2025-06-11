
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function ActionButtons(props) {

    const {
      productId, 
      isActive, 
      forUsersPage, 
      userId, 
      isAdmin, 
      isSeller
    } = props;

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  
    function setIsAdmin(e, isAdmin){ 
      setIsLoading(true);

      e.preventDefault()

      fetch(`${process.env.REACT_APP_API_URL}/users/set-user-privileges`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          isAdmin: isAdmin
        })
      })
      .then(res => res.json())
      .then(data => {

        if(data.response === true){
          setIsLoading(false);
          Swal.fire({
            title: `${data.message}`,
            icon: 'success',
            confirmButtonColor: "#2c3e50"
        });
        navigate(`/admin-redirect`);

        } else {
          setIsLoading(false);
          Swal.fire({
            title: 'Something went wrong!',
            text: `${data.message}`,
            icon: 'error',
            confirmButtonColor: "#2c3e50",
            text: 'Please try again'
        });
        }
      })
    }
    
    function setIsSeller(e){
      setIsLoading(true);

      e.preventDefault()

      Swal.fire({
        title: 'Set Seller Name',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: "#2c3e50",
        cancelButtonColor: '#d33',
        confirmButtonText: 'Register Seller',
        showLoaderOnConfirm: true,
  
        preConfirm: (sellerName) => {
          return  fetch(`${process.env.REACT_APP_API_URL}/sellers/register-seller`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              userId,
              sellerName: sellerName
            })
          })
          .then(res => res.json())
          .then(data => {
    
            if(data.response === true){
              setIsLoading(false);
              return data
    
            } else {
              throw new Error(data.message)
            }
          })
          .catch( error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          });
          
        },

        allowOutsideClick: () => !Swal.isLoading()
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Seller successfully registered!',
            icon: 'success',
            confirmButtonColor: "#2c3e50"
          })
          navigate(`/admin-redirect`)
        } else if(result.dismiss === Swal.DismissReason.cancel){
          navigate(`/admin-redirect`) 
        }
      })
    }

    function deleteUser(e){
      setIsLoading(true);

      e.preventDefault()


      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: "#e74c3c",
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${process.env.REACT_APP_API_URL}/users/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              userId
            })
          })
          .then(res => res.json())
          .then(data => {
    
            if(data.response === true){
              setIsLoading(false);
              Swal.fire({
                title: `${data.message}`,
                icon: 'success',
                confirmButtonColor: "#2c3e50"
            });
            navigate(`/admin-redirect`);
    
            } else {
              setIsLoading(false);
              Swal.fire({
                title: 'Something went wrong!',
                text: `${data.message}`,
                icon: 'error',
                confirmButtonColor: "#2c3e50",
                text: 'Please try again'
            });
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          navigate(`/admin-redirect`);
          Swal.fire(
            'Cancelled',
            'User was not deleted.',
            'error'
          )
        }
      })
      
    }


  return (
    //////// For Users Page
    (forUsersPage === true) ?
      <div className="d-flex flex-column">
        {isLoading ?
        <div className="text-center">
          <Spinner size="sm"/>
        </div> 
        :
        <>
          {(isAdmin) ?
            
            <Button as={Link} onClick={e => setIsAdmin(e, false)} size='sm' variant="warning mb-1 small-font">AS NON-ADMIN</Button>
          :

            <Button as={Link} onClick={e => setIsAdmin(e, true)} size='sm' variant="success mb-1 small-font">AS ADMIN</Button>

          }
          {(isSeller) ?

              <></>
          :

            <Button as={Link} onClick={e => setIsSeller(e)} size='sm' variant="success mb-1 small-font">AS SELLER</Button>

          }
          <Button as={Link} to={``} size='sm' variant="primary mb-1 small-font">UPDATE</Button>
          <Button as={Link} onClick={e => deleteUser(e)}  size='sm' variant="danger mb-1 small-font">DELETE</Button>
          </>
        }
          
      </div>


    //////////////////////////////////// For Products Page
    :
    <>
      {isLoading ?
        <div className="text-center">
          <Spinner size="sm"/>
        </div> 
        :
        <>
          <div className="d-flex flex-column">
              <Button as={Link} to={`/admin-view-product/${productId}`}  size='sm' variant="primary mb-1 small-font">VIEW</Button>
              <Button as={Link} to={`/admin-update-product/${productId}`} size='sm' variant="warning mb-1 small-font">UPDATE</Button>
              {(isActive) ?
      
                  <Button as={Link} to={`/admin-archive-product/${productId}`} size='sm' variant="danger mb-1 small-font">ARCHIVE</Button>
              :
      
                  <Button as={Link} to={`/admin-activate-product/${productId}`} size='sm' variant="success mb-1 small-font">ACTIVATE</Button>
      
              }
          </div>
        </>
      }
    </>
  
  )
}
