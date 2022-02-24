// import React from 'react';
// import { Divider } from '@material-ui/core';
// import './Cart.css';
// import Subtotal from './Subtotal';
// import { useStateValue } from '../../stateProvider'

// const Cart = () => {
//     const [{ state, basket, user }, dispatch] = useStateValue();
//     return (
//         <>
//             {basket.length ?
//                 <div className="cart-section">
//                     <div className="cart-container">
//                         <div className="left-cart">
//                             <h1>Shopping Cart</h1>
//                             <p>Select all items</p>
//                             <span className="leftcartprice">
//                                 Price
//                             </span>
//                             <Divider />
//                             {
//                                 basket.map((item, index) => {
//                                     return (
//                                         <>
//                                             <div className="item-container" key={index}>
//                                                 <img src={item.image} alt="productimg" />
//                                                 <div className="item-details">
//                                                     <h3>{item.title}</h3>
//                                                     <h3 className="price">₹{item.price}.00</h3>
//                                                     <p className="ship">Usually dispached in 8 days.</p>
//                                                     <p>Eligible for FREE Shipping</p>
//                                                     <img src="" alt="" />
//                                                 </div>
//                                                 <div className="quantity">
//                                                     <a href="#" class="quantity__minus"><span>-</span></a>
//                                                     <input name="quantity" type="text" class="quantity__input" value="1" />
//                                                     <a href="#" class="quantity__plus"><span>+</span></a>
//                                                 </div>
//                                             </div>
//                                         </>
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div>
//                 </div> : <div>hi</div>
//             }
//         </>
//     )
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import './Cart.css'
import { useSelector } from 'react-redux';
import { useStateValue } from '../../stateProvider'
import CartProduct from './CartProduct';
import Subtotal from './Subtotal';

const Cart = () => {
    const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
    const [basketQuantity, setBasketQuantity] = useState(0);
    const [basketTotal, setBasketTotal] = useState(0)
    let sum = 0;
    useEffect(() => {
        const basketLength = basket.map((item) => {
            return sum += parseInt(item.quantity)
        })
        console.log(basketLength);
        console.log(`sum ${sum}`);
        setBasketQuantity(basketLength[basketLength.length - 1])
        dispatch({
            type: 'SET_QUANTITY',
            Quantity: basketLength[basketLength.length - 1]
        })
        const total = basket.map((item, index) => {
            return item.price * item.quantity
        })
        console.log(total);
        setBasketTotal(total[0])
    }, [basket])

    useEffect(() => {
        console.log(Quantity);
    }, [dispatch])

    const cartUpdate = async () => {
        if (user) {
            const res = await fetch(`/updatedata/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.token
                },
                body: basket
            })
        }
    }
    useEffect(() => {
        if (basket.length) {
            cartUpdate();
        }
    }, [dispatch])

    console.log(user);
    return (
        <div className="cart">
            <div className="cart-left">
                <img className='cart-ad' src="" alt="" />
            </div>
            <div>
                {user ? <h3>Hello, {`${user.firstname} ${user.lastname}`}</h3> : <h3>Please Sign In for Order</h3>}
                <h2 className='cart-title'>
                    {basket.length === 0 ? "Your Basket is Emply" : "Your Shopping Basket"}
                </h2>
                {basket.map((item, index) => {
                    return (
                        <CartProduct id={item.id} title={item.title} image={item.image} price={item.price} quantity={item.quantity} />
                    )
                })}
            </div>
            <div className="cart-right">{basket.length ? <Subtotal /> : <div></div>}</div>
        </div>
    );
};

export default Cart;

