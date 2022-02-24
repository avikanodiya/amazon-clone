import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import AllProducts from './components/AllProducts/AllProducts'
import Header from './components/Header/Header'
import SingleProduct from './pages/SingleProduct/SingleProduct'
import ProductCategory from './components/ProductCategory/ProductCategory'
import { useStateValue } from './stateProvider'
import Payment from './pages/Payment/Payment'
import Orders from './pages/Orders/Orders'
import Profile from './pages/Profile/Profile'
import axios from 'axios'

const App = () => {
  const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
  // useEffect(() => {
  //   const loggedUser = localStorage.getItem("user");
  //   if (loggedUser) {
  //     const foundUser = JSON.parse(loggedUser)
  //     dispatch({
  //       type: 'SET_USER',
  //       user: foundUser
  //     })
  //   }
  // })
  // useEffect(() => {
  //   console.log('que');
  // }, [dispatch])

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const foundUser = JSON.parse(loggedUser)
      dispatch({
        type: 'SET_USER',
        user: foundUser
      })
    }
  }, [dispatch])


  return (
    <>

      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={< Cart />}></Route>
          <Route path="/all" element={<AllProducts />}></Route>
          <Route path="/products/getproduct/:id" element={<SingleProduct />}></Route>
          <Route path="/products/getcategory/:categoryId" element={<ProductCategory />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<Login />}></Route>
        </Routes>
      </div>

    </>
  )
}

export default App
