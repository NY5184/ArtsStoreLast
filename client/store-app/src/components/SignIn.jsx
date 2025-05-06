//bs"d
import React ,{useState}from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "./styles.css";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
const SigIn=(visit)=> {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async(data) => {
    try{ 
     

        const newUser = {
            email: data.Email,
            name: data.Name,
           password:data.Password,
            username: data.UserName
        }
    const signInRes = await axios.post('http://localhost:7020/auth/register',newUser)
  
    if (signInRes.status === 201) {
      
        const LOgInRes = await axios.post('http://localhost:7020/auth/login',newUser)
        localStorage.setItem("currentUserToken",LOgInRes.data.accessToken)
        navigate('/arts')
    }
    }
    catch(e){
        debugger
        alert("Worng details")
    }
   
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input
  const [visible, setVisible] = useState(visit);
  const navigate = useNavigate();
  return (
    <div className="card flex justify-content-center">
    
        <Dialog header="SignIn" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); 
          navigate("/")
        }}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        {...register("Name", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.Name?.type === "required" && <p>This field is required</p>}
      {errors?.Name?.type === "maxLength" && (
        <p>Name cannot exceed 20 characters</p>
      )}
      {errors?.Name?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
        <label>UserName</label>
      <input
        {...register("UserName", {
          required: true,
          maxLength: 20,
          minLength:8

        })}
      />
      {errors?.UserName?.type === "required" && <p>This field is required</p>}
      {errors?.UserName?.type === "maxLength" && (
        <p>UserName cannot exceed 20 characters</p>
      )}
     
        {errors?.UserName?.type === "minLength" && (
        <p>UserName cannot exceed less than 8 characters</p>
      )}
    
    <label>Password</label>
      <input
        {...register("Password", {
          required: true,
          maxLength: 20,
          minLength:8
       
        })}
      />
      {errors?.Password?.type === "required" && <p>This field is required</p>}
      {errors?.Password?.type === "maxLength" && (
        <p>Password cannot exceed 20 characters</p>
      )}
   
        {errors?.Password?.type === "minLength" && (
        <p>Password cannot exceed less than 8 characters</p>
      )}
             <label>Email</label>
      <input
        {...register("Email", {
          required: true,
          maxLength: 30,
          minLength:8,pattern: /^\S+@\S+$/i
        })}
      />
      {errors?.Email?.type === "required" && <p>This field is required</p>}
      {errors?.Email?.type === "maxLength" && (
        <p>Email cannot exceed 30 characters</p>
      )}
      {errors?.Email?.type === "pattern" && (
        <p>Email pattern only</p>
      )}
     
      <input type="submit" />
    </form>
    </Dialog>
   </div>
  );

}


export default SigIn