import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Logincontext } from '../../components/Context/ContextProvider'
import { useStateValue } from '../../stateProvider'
import { useEffect } from 'react'

const Login = () => {
    let name, value;
    let navigate = useNavigate();
    const { account, setAccount } = useContext(Logincontext)
    const [passwordAlert, setPasswordAlert] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [formErrors, setFormErrors] = useState({});
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const [{ }, dispatch] = useStateValue()

    useEffect(() => {

    }, [formErrors])
    const handleInputs = (e) => {
        console.log(e.target.name)
        // if (e.target.name === 'password') {
        //     if (e.target.value < 6) {
        //         setPasswordAlert(true)
        //     } else {
        //         name = e.target.name;
        //         value = e.target.value;
        //         setUser({ ...user, [name]: value })
        //     }
        // } else {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
        // }

        console.log(user)
    }

    const validateForm = (values) => {
        const errors = {};
        const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!values.email) {
            errors.email = "email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "enter a valid email"
        } else if (!values.password) {
            errors.password = "password is required!"
        } else if (values.password.length < 6) {
            errors.password = "password must be 6 or more characters long"
        } else {
            return false;
        }
        return errors;
    }

    const postData = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        const res = await fetch("/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            setWrongPassword(true)

        } else if (data.role == 'admin') {
            dispatch({
                type: "SET_USER",
                user: data
            })
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/adminpanel')
        } else {
            console.log(res.status);
            dispatch({
                type: "SET_USER",
                user: data
            })
            localStorage.setItem('user', JSON.stringify(data))
            window.alert('login successful')
            console.log(account);
            navigate('/')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user))
        if (!formErrors) {
            postData(e)
        }
    }
    return (
        <>
            <div className="login">
                {wrongPassword && <h5 style={{ color: "red", marginTop: "15px" }}>Incorrect Email or Password</h5>}
                <Link to='/'>
                    <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" className='login-logo' />

                </Link>
                <div className="login-container">
                    <h1>Sign in</h1>
                    <form action="">
                        <h5>Email</h5>
                        <input type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputs} required={true} />
                        <p>{formErrors.email}</p>
                        <h5>Password</h5>
                        <input type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputs} required />
                        <p>{formErrors.password}</p>
                        {/* {passwordAlert && <h5><b>password must be 6 or more character long</b></h5>} */}
                        <button type="submit" className='login-signin' onClick={(e) => handleSubmit(e)}>
                            SignIn
                        </button>
                    </form>
                    <p>By continuing, you agree to Amazon's conditions of Use and Privacy Notice.</p>
                </div>
                <p>New to Amazon ?</p>
                <button className='login-register' onClick={() => { navigate('/register') }}>Create Your Account</button>
            </div>
        </>
    )
}

export default Login
