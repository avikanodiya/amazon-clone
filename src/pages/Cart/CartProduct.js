import React, { useEffect, useState } from 'react';
import './CartProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import { useStateValue } from '../../stateProvider';

const CartProduct = ({ id, title, image, price, quantity, hideButton }) => {
    const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
    const [selected, setSelected] = useState()
    const removeItem = (id) => {
        let productEx = basket.find(b => b.id === id)
        if (productEx.quantity > '1') {
            productEx.quantity = parseInt(productEx.quantity) - 1
            setSelected(productEx.quantity)
        } else {
            dispatch({
                type: "REMOVE_FROM_BASKET",
                id: id
            })
        }
    }

    useEffect(() => {
        setSelected(quantity)
    }, [])

    // useEffect(() => {
    //     let q = Quantity
    //     dispatch({
    //         type: 'SET_QUANTITY',
    //         Quantity: q + parseInt(quantity)
    //     })
    // }, [selected, , quantity])

    const handleSelect = (e) => {
        let existProduct = basket.find(b => b.id === id)
        if (existProduct) {
            let q = Quantity
            let newQuantity = q - parseInt(existProduct.quantity) + parseInt(e.target.value)
            dispatch({
                type: "SET_QUANTITY",
                Quantity: newQuantity
            })
            existProduct.quantity = e.target.value
            console.log(e.target.value);
            setSelected(e.target.value)
        }
        console.log(basket);
    }
    return (
        <div className="cart-product">
            <img src={image} alt="" className='cart-product-image' />
            <div className="cart-product-info">
                <p className="cart-product-title">{title}</p>
                <p className="cart-product-price">
                    <strong>₹</strong>
                    {!hideButton ? <strong>{price * selected}</strong> : <strong>{price}</strong>}
                </p>
                {!hideButton && (
                    <div className="quantity">
                        <select value={selected} name="" id="" onChange={handleSelect}>
                            <option >1</option>
                            <option >2</option>
                            <option>3</option>
                            <option >4</option>
                            <option >5</option>
                            <option >6</option>
                            <option >7</option>
                            <option >8</option>
                            <option >9</option>
                            <option >10</option>
                        </select>
                    </div>
                )}

                {!hideButton && (
                    <button className="" onClick={() => removeItem(id)}>
                        <i>
                            <ShoppingCartOutlined />
                        </i>
                        Remove from Basket
                    </button>
                )}

            </div>
        </div>
    );
};

export default CartProduct;
