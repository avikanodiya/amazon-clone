import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../stateProvider'
import './Orders.css'
import Order from '../../components/Order/Order'
const Orders = () => {
    const [{ user }, dispatch] = useStateValue();
    const [order, setOrder] = useState();
    console.log(user);
    const fetchOrder = async (id) => {
        const res = await fetch(`/users/getorders/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": user.token
            }
        })
        const data = await res.json()
        setOrder(data)
        console.log(data);
    }
    useEffect(() => {
        if (user) {
            fetchOrder(user._id)
        }
    }, [user])
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders-order">
                {order && order.map((order, index) => <Order order={order} key={index} />)}
            </div>
        </div>
    )
}

export default Orders