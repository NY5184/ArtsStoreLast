//bs"d
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "./styles.css";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/userDetails';

const LogIN = (visit) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {

      debugger
      const userDetails = {

        password: data.Password,
        username: data.UserName
      }
      const LogInRes = await axios.post('http://localhost:7020/auth/login', userDetails)
      console.log("LogInRes", LogInRes)
      if (LogInRes.status === 200) {

        dispatch(setUser(LogInRes.data.user))
        dispatch(setToken(LogInRes.data.accessToken))
        // localStorage.setItem("currentUserToken", LogInRes.data.accessToken)
        // localStorage.setItem("currentUserToken", LogInRes.data.accessToken)
        console.log("aert", LogInRes.data)
        if (user.role === "admin") { navigate('/manager') }
        else {
          navigate("/arts")
        }
        
      }

    }
    catch (e) {
      debugger
      alert("Worng details")
    }

  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input
  const [visible, setVisible] = useState(visit);
  const navigate = useNavigate();
  return (
    <div className="card flex justify-content-center">

      <Dialog header="LogIn" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => {
        if (!visible) return; setVisible(false);
        if (user.role === "admin") {navigate("/manager")  }
        else {
          navigate("/")
        }
      }}>


        <form onSubmit={handleSubmit(onSubmit)} >

          <label>UserName</label>
          <input
            {...register("UserName", {
              required: true,
              maxLength: 20,
              minLength: 8

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
              minLength: 8

            })}
          />
          {errors?.Password?.type === "required" && <p>This field is required</p>}
          {errors?.Password?.type === "maxLength" && (
            <p>Password cannot exceed 20 characters</p>
          )}

          {errors?.Password?.type === "minLength" && (
            <p>Password cannot exceed less than 8 characters</p>
          )}


          <input type="submit" />
        </form>
        <div className="card flex justify-content-center">

          <Button label="SignIn" onClick={() => { navigate('/signIn') }} />
        </div>
      </Dialog>
    </div>

  );
}
export default LogIN



