import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from '../../stateProvider';
import CurrencyFormat from 'react-currency-format';
import { useNavigate, Link } from 'react-router-dom';
import { getBasketTotal } from '../../redux/reducer';
import CartProduct from '../Cart/CartProduct';
import axios from 'axios';

const Payment = () => {
    let name, value;
    const navigate = useNavigate()
    const [basketQuantity, setBasketQuantity] = useState(0)
    const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
    const [amountTotal, setAmountTotal] = useState()
    const [errorAddress, setErrorAddress] = useState(false)
    const [address, setAddress] = useState({
        add1: '', add2: '', pincode: '', contact: ''
    })
    let sum = 0;

    const addorder = async (user, basket, date, amountTotal, address) => {
        const addressCombined = `${address.add1} ${address.add2} ${address.pincode}`
        const res = await fetch('/users/addorder', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": user.token
            },
            body: JSON.stringify({ id: user._id, basket: basket, date: date, amount: amountTotal, address: addressCombined, contact: address.contact })
        })
    }
    useEffect(() => {
        setTimeout(() => {
            // setBasketQuantity(getBasketQuantity(basket))
            // console.log(getBasketQuantity(basket))
            setAmountTotal(getBasketTotal(basket))
            console.log(Quantity);
        }, 1000);
        console.log(typeof amountTotal);
    }, [basket, dispatch])

    const displayRazorpay = async (e) => {
        e.preventDefault();
        console.log('inside payment');
        // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        // const response = await axios.post('/razorpay/order', amountTotal)
        const res = await fetch(`/razorpay/order/${amountTotal}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data, res);
        // const { data } = response
        const options = {
            key: "rzp_test_QVqVJ3M5OuTR34",
            name: "amazon-clone",
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    console.log(response);
                    const paymentId = response.razorpay_payment_id;
                    const captureResponse = await fetch(`/razorpay/capture/${paymentId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ amountTotal: amountTotal })
                    })
                    // const captureResponse = await axios.post(`http://localhost:5000/razorpay/capture/${paymentId}`, {})
                    console.log(captureResponse);
                    console.log(captureResponse.body)
                    console.log(captureResponse.data);
                    const successObj = await captureResponse.json()
                    const result = JSON.parse(successObj)
                    console.log(JSON.parse(successObj));
                    if (result.captured) {
                        let today = new Date()
                        // let dateformated = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
                        await addorder(user, basket, today, amountTotal, address)
                        console.log('payment success');
                        dispatch({
                            type: "EMPTY_BASKET"
                        })
                        navigate('/orders')
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setAddress({ ...address, [name]: value })
        console.log(address);
    }

    const handlePayment = (e) => {
        if (address.add1 !== '' && address.add2 !== '' && address.pincode !== '' && address.contact !== '') {
            if (address.contact.length >= 10) {
                setErrorAddress(false)
                displayRazorpay(e);
            } else {
                console.log(address.contact);
                console.log(`${address.add1} ${address.add2} ${address.pincode}`)
                setErrorAddress(true)
            }
        } else {
            console.log('invalid address');
            setErrorAddress(true)
        }
    }
    return (
        <div className="payment">
            <div className="payment-container">
                <h1>Checkout {<Link to="/cart">{Quantity} items</Link>}</h1>
                {errorAddress && <h3>Enter proper details</h3>}
                <div className="payment-section">

                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                        <label htmlFor="add1"><b>Flat,House no., Building, Company, Apartment</b > </label><br /> <br />
                        <label htmlFor="add2"> <b>Area, Street, Sector, Village, State</b> </label><br /> <br />
                        <label htmlFor="pincode"><b>Pincode</b></label><br /> <br />
                        <label htmlFor="contact"><b>Contact Number</b></label>
                    </div>

                    <div className="payment-address">
                        <p>{user && user.email}</p>
                        <input name="add1" id="add1" value={address.add1} onChange={handleInputs} type="text" required />
                        <input name="add2" id="add2" value={address.add2} onChange={handleInputs} type="text" required />
                        <input name="pincode" id="pincode" value={address.pincode} onChange={handleInputs} type="number" required />
                        <input type="number" name="contact" id="contact" value={address.contact} onChange={handleInputs} required />
                    </div>

                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket && basket.map((item) => (
                            <CartProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                quantity={item.quantity} />
                        ))}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <form action="">
                            <div className="payment-pricecontainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={amountTotal}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'₹'} />
                                {user.add1}
                                <button type='button' onClick={(e) => handlePayment(e)}>
                                    <span>Buy Now</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment