import React from 'react'
import "./Product.css"
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

const Product = ({ id, title, image, price, specification }) => {
    console.log(specification)
    return (
        <>
            <div className="product">
                <div className="info">
                    <Link to={`/products/getproduct/${id}`} className='title'>
                        <p>{title}</p>
                    </Link>
                    <p className="price">
                        <strong>₹</strong>
                        <strong>{price}</strong>
                    </p>
                    <img src={image} alt="" />
                    {/* <button onClick={() => addToBasket(id)}>
                        <i>
                            <ShoppingCartOutlinedIcon />
                        </i>
                        Add to Basket
                    </button> */}

                </div>
            </div>
        </>
    )
}

export default Product
