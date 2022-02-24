import React, { useContext, useEffect, useState } from 'react';
import './SingleProduct.css'
import { containerClasses, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, addCart } from '../../redux/action';
import { useStateValue } from '../../stateProvider';
let counter = 0;
const SingleProduct = () => {
  const navigate = useNavigate();
  const [product, setProducts] = useState('')
  const { id } = useParams("")
  const { products } = useSelector(state => state.getproductsdata)
  const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
  const dispach = useDispatch();
  useEffect(() => {
    dispach(getProducts());
  }, [dispach])

  const getData = async () => {
    const res = await fetch(`/products/getproduct/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    if (res.status !== 201) {
      console.log('data not available');
    } else {
      setProducts(data)
    }
  }

  const addToBasket = async (id) => {
    let que = Quantity;
    let product = products.find(p => p._id === id)
    console.log(product);
    let existProduct = basket.find(b => b.id === id)
    if (existProduct) {
      let q = parseInt(existProduct.quantity)
      existProduct.quantity = q + 1
      let updateQuantity = que + 1
      dispatch({
        type: "SET_QUANTITY",
        Quantity: updateQuantity
      })
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.imageUrl,
          quantity: 1
        }
      })
      let updateQuantity = que + 1
      dispatch({
        type: "SET_QUANTITY",
        Quantity: updateQuantity
      })
    }
  }

  useEffect(() => {
    getData()
  })

  const handleBuynow = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.imageUrl,
        quantity: 1
      }
    })
    navigate('/payment')
  }

  const addCart = async (id, token) => {
    console.log('inside function');
    const res = await fetch(`/users/updatedata/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'x-access-token': token
      },
      body: JSON.stringify({
        basket
      }),

    })
    console.log(res.statusText);
    if (res.statusText === 'Unauthorized') {
      localStorage.removeItem('user')
      navigate('/login')
    }
    const data = res.json()
    console.log(data);
  }

  const basketUpdate = async (productId, id, token) => {
    await addToBasket(productId)
    if (user) {
      await addCart(id, token)
    }
  }

  return (
    <div className="cart-section">
      {product && Object.keys(product).length && <div className='cart-container'>
        <div className="left-cart">
          <img src={product.imageUrl} alt="" />

        </div>
        <div className="right-cart">
          <h3>{product.title}</h3>
          <h4>Company : {product.company}</h4>

          <p className="mrp">Price :₹{product.price}</p>
          <Divider />
          <p className='description'><b>About the Item: </b><span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>
            <ul className='specification'>
              {Object.keys(JSON.parse(product.specification)).map((item, i, key) => {
                // console.log(Object.keys(JSON.parse(product.specification)[i]));
                return (
                  <li key={i}>{key[i]} : {JSON.parse(product.specification)[item]}</li>
                )
              })}
            </ul></span></p>
          <div className="cart-btn">
            {/* <button className="cart-btn1" onClick={() => {
              addToBasket(product._id)
              if (user) {
                addCart(user._id, user.token)
              }
            }
            }>Add to Cart</button> */}
            <button className='cart-btn1' onClick={
              () => {
                if (!user) {
                  basketUpdate(id, null, null)
                } else {
                  basketUpdate(id, user._id, user.token)
                }

              }}>Add to Cart</button>
            <button className="cart-btn2" onClick={() => handleBuynow(product)}>Buy Now</button>
          </div>
        </div>
      </div>}
    </div >
  );
};

export default SingleProduct;
