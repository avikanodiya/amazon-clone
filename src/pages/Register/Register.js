import React, { useState, useEffect } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    let navigate = useNavigate();
    let name, value;
    const [user, setUser] = useState({
        email: "", firstname: "", lastname: "", password: ""
    })

    const [passwordAlert, setPasswordAlert] = useState(false)
    const [formErrors, setFormErrors] = useState({});

    const handleInputs = (e) => {
        // console.log(e.target.name)
        // if (e.target.name === 'password') {
        //     if (e.target.value.length < 6) {
        //         setPasswordAlert(true)
        //         name = e.target.name;
        //         value = e.target.value;
        //         setUser({ ...user, [name]: value })
        //     } else if (e.target.value.length >= 6) {
        //         setPasswordAlert(false)
        //         name = e.target.name;
        //         value = e.target.value;
        //         setUser({ ...user, [name]: value })
        //     }
        // } else {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
        // }

        // console.log(user)
    }

    const validateForm = (values) => {
        const errors = {};
        const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!values.email) {
            errors.email = "email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "enter a valid email"
        }
        if (!values.password) {
            errors.password = "password is required!"
        } else if (values.password.length < 6) {
            errors.password = "password must be 6 or more characters long"
        }
        if (!values.firstname) {
            errors.firstname = "firstname required"
        }
        if (!values.lastname) {
            errors.lastname = "lastname is required"
        }
        return errors;
    }

    const postData = async (e) => {
        e.preventDefault()
        const { email, firstname, lastname, password } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, firstname, lastname, password
            })
        })
        const data = await res.json();
        console.log(data)
        if (res.status === 422 || !data) {
            window.alert("invalid registration")
            console.log("invalid registration");
        } else {
            window.alert('successful registration')
            console.log("successful registration");
            navigate("/login")
        }

    }

    const handleSubmit = (e) => {
        console.log(formErrors);
        e.preventDefault();
        setFormErrors(validateForm(user))
        const len = Object.keys(formErrors).length
        console.log(len);
        if (len === 0) {
            postData(e)
        }
    }


    return (
        <>
            <div className="register">
                <Link to='/'>
                    <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" className='register-logo' />
                </Link>
                <div className="register-container">
                    <h1>Create Account</h1>
                    <form method='POST' action="">
                        {/* <h5>Username</h5>
                        <input type="text"
                            autoComplete='off'
                            name="username"
                            value={user.username}
                            onChange={handleInputs}
                            required /> */}
                        <h5>E-mail</h5>
                        <input type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputs}
                            required />
                        <p>{formErrors.email}</p>
                        <h5>First Name</h5>
                        <input type="text"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleInputs}
                            required />
                        <p>{formErrors.firstname}</p>
                        <h5>Last Name</h5>
                        <input type="text"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleInputs}
                            required />
                        <p>{formErrors.lastname}</p>
                        <h5>Password</h5>
                        <input type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputs}
                            required />
                        <p>{formErrors.password}</p>
                        {/* {passwordAlert && <h5><b>password must be 6 or more character long</b></h5>} */}
                        <button type="submit" className='continue' onClick={handleSubmit}>
                            Continue
                        </button>
                        <div className="detail">
                            <p>Already have an account ?</p>
                            <Link to="/login" className='signin-link'>
                                <p>Sign In</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
