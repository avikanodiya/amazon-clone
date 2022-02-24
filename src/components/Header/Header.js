import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Link, useNavigate } from "react-router-dom"
import { useStateValue } from '../../stateProvider';
import { List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/action'
import { getBasketQuantity } from '../../redux/reducer';

const Header = () => {
    const navigate = useNavigate();
    const [{ basket, user, Quantity }, dispatch] = useStateValue();
    const { products } = useSelector(state => state.getproductsdata)
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const [basketQuantity, setBasketQuantity] = useState();
    const handleSelect = (e) => {
        console.log(e.target.value);
        let val = e.target.value
        navigate(`/${val}`)
    }
    let sum = 0;

    const handleLogout = () => {
        console.log('logout');
        dispatch({
            type: "SET_USER",
            user: null
        })
        localStorage.removeItem('user')
        navigate('/')
    }


    const validateUser = async () => {
        const res = await fetch(`/validuser/${user._id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": user.token
            }
        })

        const data = await res.json();

        if (res.status !== 201) {
            dispatch({
                type: "SET_USER",
                user: data
            })
        } else {
            localStorage.removeItem('user')
            dispatch({
                type: "SET_USER",
                user: null
            })
            navigate('/login')
        }
    }

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }

    useEffect(() => {
        if (user) {
            validateUser();
        }
    }, [])

    useEffect(() => {

    }, [Quantity])

    // useEffect(() => {
    //     // const basketLength = basket.map((item) => {
    //     //     return sum += item.quantity
    //     // })
    //     // 
    //     setInterval(() => {
    //         // setBasketQuantity(getBasketQuantity(basket))
    //         // console.log(getBasketQuantity(basket))
    //         const basketLength = basket?.reduce((quantity, item) => quantity + parseInt(item.quantity), basketQuantity)
    //         if (basketLength) {
    //             setBasketQuantity(basketLength)
    //             console.log(basketLength);
    //         }

    //     }, 5000);


    // },[])
    useEffect(() => {

    }, [basket])
    useEffect(() => {
        const basketLength = basket.map((item) => {
            return sum += parseInt(item.quantity)
        })
        setBasketQuantity(basketLength)
    }, [basket])
    return (
        <nav className='header'>
            <Link to='/'>
                <img className='header-logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon_logo" />
            </Link>
            <div className="header-option" style={{ marginRight: "-10px" }}>
                <LocationOnOutlinedIcon />
            </div>
            <div className="header-option">
                <span className='header-option1'>Hello</span>
                <span className='header-option2'>Select Your Address</span>
            </div>
            <div className="search">
                <select name="" id="" onChange={() => handleSelect}>
                    <option value="all">All</option>
                </select>
                <input type="text" className="searchInput" onChange={(e) => getText(e.target.value)} />
                <SearchIcon className="searchIcon" />
                {text && <List className="extrasearch" hidden={liopen}>
                    {
                        products.filter(product => product.title.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem>
                                <Link to={`/products/getproduct/${product._id}`} onClick={() => setLiopen(true)}>
                                    {product.title}
                                </Link>
                            </ListItem>
                        ))
                    }</List>}
            </div>
            <div className="header-nav">
                {user ? <div className="header-option">
                    <Link to='/profile'><span className="header-option1 header-link">Hello {user.firstname}</span></Link>
                    <span className="header-option2" onClick={handleLogout}>Sign Out</span>
                </div> : <Link to="/login" className='header-link'>
                    <div className="header-option">
                        <span className="header-option1">Hello Guest</span>
                        <span className="header-option2">Sign In</span>
                    </div>
                </Link>}

                {user ? <Link to="/orders" className='header-link'>
                    <div className="header-option">

                        <span className="header-option1">Returns</span>
                        <span className="header-option2">& Orders</span>
                    </div>
                </Link> :
                    <Link to="/login" className='header-link'><div className="header-option">
                        <span className="header-option1">Returns</span>
                        <span className="header-option2">& Orders</span>
                    </div>
                    </Link>

                }

                {
                    basket ? <Link to='/cart' className='header-link'>
                        <div className="headerbasket">
                            <ShoppingCartOutlinedIcon />
                            <span className="header-option2 basket-count">{Quantity}</span>
                        </div>
                    </Link>
                        : <Link to='/cart' className='header-link'>
                            <div className="headerbasket">
                                <ShoppingCartOutlinedIcon />
                                <span className="header-option2 basket-count">0</span>
                            </div>
                        </Link>
                }

            </div>
        </nav >
    )
}

export default Header
