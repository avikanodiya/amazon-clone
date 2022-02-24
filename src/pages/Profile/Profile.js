import React, { useState } from 'react'
import { useStateValue } from '../../stateProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
    const [updatedUser, setUpdatedUser] = useState({
        email: user.email, firstname: user.firstname, lastname: user.lastname, username: user.username
    })
    const navigate = useNavigate();
    let name, value;
    const handleInputs = (e) => {
        console.log(e.target.name)
        name = e.target.name;
        value = e.target.value;
        setUpdatedUser({ ...user, [name]: value })
        console.log(updatedUser)
        // const updateuser = { ...user, [name]: value }
        // console.log(updateuser);
        // dispatch({
        //     type: "SET_USER",
        //     user: updateuser
        // })
    }

    const postData = async (e) => {
        const id = user._id
        const token = user.token
        e.preventDefault()
        const res = await fetch('/users/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
            },
            body: JSON.stringify({ ...updatedUser, id })
        })
        const data = await res.json()
        console.log(res);
        // dispatch({
        //     type: "SET_USER",
        //     user: { ...data, token }
        // })
        // localStorage.setItem('user', JSON.stringify({ ...data, token }))
        if (res.status == '200') {
            navigate('/login')
            dispatch({
                type: "SET_USER",
                user: null
            })
            localStorage.removeItem('user')
            window.alert('login again')

        }
    }
    return (
        <>
            <div className='m-5'>
                <h2 className='my-5'>User Profile</h2>

                <form action="">
                    <div className="col mb-3 w-25">
                        <div className="row-sm mb-4">
                            <label htmlFor="" className='form-label'>email: </label>
                            <input type="text" className="form-control" name="email" value={updatedUser.email} onChange={handleInputs} />
                        </div>
                        <div className="row-sm mb-4">
                            <label htmlFor="" className='form-label'>firstname: </label>
                            <input type="text" className="form-control" name="firstname" value={updatedUser.firstname} onChange={handleInputs} />
                        </div>
                        <div className="row-sm mb-4">
                            <label htmlFor="" className='form-label'>lastname: </label>
                            <input type="text" className="form-control" name="lastname" value={updatedUser.lastname} onChange={handleInputs} />
                        </div>
                        <div className="row-sm mb-4">
                            <div className="col">
                                <div className="row-sm float-end">
                                    <button type="button" className='btn btn-warning me-3' onClick={(e) => postData(e)}>update</button>
                                    <button className='btn btn-success' onClick={() => navigate('/')}>home</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile