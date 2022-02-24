import React, { useEffect, useState } from 'react';
import './SubTotal.css'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../stateProvider'
import { getBasketTotal } from '../../redux/reducer';

const Subtotal = () => {
    const [{ state, basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate()
    const handleCheckout = () => {
        if (user) {
            navigate("/payment")
        } else {
            navigate("/login")
        }
    }

    const [basketQuantity, setBasketQuantity] = useState(0);
    const [basketTotal, setBasketTotal] = useState(0)
    let sum = 0;
    useEffect(() => {
        const basketLength = basket.map((item) => {
            return sum += item.quantity
        })
        console.log(basketLength);
        console.log(`sum ${sum}`);
        setBasketQuantity(basketLength[basketLength.length - 1])
        const total = basket.map((item, index) => {
            return item.price * item.quantity
        })
        console.log(total);
        if (total > 0) {
            const tot = total.reduce((a, c) => a + c);
            console.log(tot);
            setBasketTotal(tot)
        }

    }, [basket])
    console.log(user);

    // useEffect(() => {
    //     const total = basket.map((item, index) => {
    //         return item.price * item.quantity
    //     })
    //     console.log(total);
    //     setBasketTotal(total[0])
    // }, [basket])
    // console.log(basketTotal);

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            SubTotal ({basket.length} items) : <strong>₹ {basketTotal}</strong>
                        </p>
                        <small className='subtotal-gift'>
                            <input type="checkbox" className="checkbox" />
                            This orders contain a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={basketTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={'₹'} />
            {user ? <button onClick={handleCheckout}>Proceed to Checkout</button> : <button className='disabled'>Proceed to Checkout</button>}
        </div>
    )
};

export default Subtotal;
