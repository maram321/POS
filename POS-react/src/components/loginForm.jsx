import React from 'react';
import Joi from 'joi-browser';
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Form from "./common/form";
import auth from '../services/authService';
import image from "./image.ico"
import "./form.css"

class LoginForm extends Form {
    state = {
        data:{username: "",password: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().min(5).max(30),
        password: Joi.string().required().min(5).max(30)
    };

    doSubmit = async() => {
        try {
           await auth.login(this.state.data.username, this.state.data.password);
           
           window.location.replace("/sales/bill/new");
        }
        catch(ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors};
                errors.username = ex.response.data;
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
                    <h1>تسجيل الدخول</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form">
                            <input 
                            value={this.state.data.username} 
                            onChange={this.handleChange} 
                            name='username' 
                            id='username' 
                            type="text" 
                            className="form-control" />
                            <label htmlFor="username" for="">اسم المستخدم</label>
                            <FaRegUser className='icon'style={{fontSize:18}}/>
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
                        <button className="btn" disabled={this.validate()} >تسجيل الدخول</button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;