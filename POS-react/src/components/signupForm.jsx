import React from 'react';
import Joi from 'joi-browser';
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Form from "./common/form"
import auth from "../services/authService";
import { signup } from '../services/userService';
import image from "./image.ico"
import "./form.css"

class SignupForm extends Form {
    state = {
        data:{name:"", username: "",password: ""},
        errors: {}
    };

    schema = {
        name: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(5).max(30).required()
    };

    doSubmit = async() => {
        try {
           const response = await signup(this.state.data);
           auth.loginWithJwt(response.headers["x-auth-token"]);
           window.location.replace("/sales/bill/new");
        }
        catch(ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors};
                errors.name = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() { 
        return (
            <div className='login-form requires-no-scroll'>
                <div className='left-circles'>
                    <div className='circle1'></div>
                    <div className='circle2'></div>
                    <div className='circle3'></div>
                    <img src={image} className="img-fluid" alt="Not Found"></img>
                </div>
                <div className='wrapper' style={{zIndex:5}}> 
                    <h1>إنشاء حساب</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form">
                            <input 
                            value={this.state.data.name} 
                            onChange={this.handleChange} 
                            name='name' 
                            id='name' 
                            type="text" 
                            className="form-control"/>
                            <label htmlFor="name" for="">الاسم</label>
                            <FaRegUser className='icon' style={{fontSize:18}}/>
                        </div>
                        {this.state.errors.name && <p className='errors'>{this.state.errors.name}</p>}
                        <div className="form">
                            <input 
                            value={this.state.data.username} 
                            onChange={this.handleChange} 
                            name='username' 
                            id='username' 
                            type="text" 
                            className="form-control"/>
                            <label htmlFor="username" for="">اسم المستخدم</label>
                            <FaRegUser className='icon' style={{fontSize:18}}/>
                        </div>
                        {this.state.errors.username && <p className='errors'>{this.state.errors.username}</p>}
                        <div className="form">
                            <input 
                            value={this.state.data.password} 
                            onChange={this.handleChange} 
                            name='password' 
                            id='password' 
                            type="password" 
                            className="form-control" />
                            <label htmlFor="password" for="">كلمة المرور</label>
                            <MdLockOutline className='icon' style={{fontSize:18}}/>
                        </div>
                        {this.state.errors.password && <p className='errors'>{this.state.errors.password}</p>}
                        <button className="btn" disabled={this.validate()} >إنشاء حساب</button>
                    </form>
                </div>

            </div>
        );
    }
}
 
export default SignupForm;