import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/action'
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import './AllProducts.css'

const AllProducts = () => {
    const { products } = useSelector(state => state.getproductsdata)
    console.log(products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return <>
        <div className="container">
            {products.map((item) => (

                <div className="product">
                    <div className="division">
                        <div className="left-part">
                            <div className="info">
                                {/* <Link to={`products/${item.id}`} className='title'>
                                <p>{item.title}</p>
                            </Link> */}
                                {/* <p className="price">
                                    <strong>$</strong>
                                    <strong>{item.price}</strong>
                                </p> */}
                                <img src={item.imageUrl} alt="" />
                                <button>
                                    <i>
                                        <ShoppingCartOutlinedIcon />
                                    </i>
                                    Add to Basket
                                </button>
                            </div>
                        </div>
                        <div className="right-part">
                            <Link to={`/products/getproduct/${item._id}`} className='title'>
                                <p>{item.title}</p>
                            </Link>
                            <p className="price">
                                <strong>$</strong>
                                <strong>{item.price}</strong>
                            </p>
                        </div>
                    </div>

                </div>))}
        </div>
    </>;
};

export default AllProducts;
