import React, { useEffect } from 'react'
import "./Home.css"
import { headerItems } from '../../utils/ProductsData'
import Banner1 from "../../BannerImages/Banner1.jpg"
import Banner2 from "../../BannerImages/Banner2.jpg"
import Banner3 from "../../BannerImages/Banner3.jpg"
import Slider from '../Slider/Slider'
import Product from '../../components/Product/Product'
import BacktoTop from '../../components/BacktoTop/BacktoTop'
import Header from '../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getCategory } from '../../redux/action'
import { Link } from 'react-router-dom'
import Slide from '../../components/Slide/Slide'
import { useStateValue } from '../../stateProvider'

const Home = () => {
    const BannerImages = [Banner1, Banner2, Banner3];
    const { products } = useSelector(state => state.getproductsdata)
    const { category } = useSelector(state => state.getcategorydata)
    const [{ state, basket, user, Quantity }, dispatch] = useStateValue();
    console.log(products);
    console.log(category);
    const dispach = useDispatch();
    useEffect(() => {
        console.log('hi');
        dispach(getProducts());
        dispach(getCategory());
    }, [dispach])


    // const addToBasket = (id) => {
    //     let product = products.find(p => p._id === id)
    //     let existProduct = basket.find(b => b.id === id)
    //     if (existProduct) {
    //         // dispatch({
    //         //     type: "ADD_TO_BASKET",
    //         //     item: {
    //         //         id: product._id,
    //         //         title: product.title,
    //         //         price: product.price,
    //         //         image: product.imageUrl,
    //         //         quantity: existProduct.quantity + 1
    //         //     }
    //         // })
    //         let q = existProduct.quantity
    //         existProduct.quantity = q + 1
    //         console.log(q);
    //     } else {
    //         dispatch({
    //             type: "ADD_TO_BASKET",
    //             item: {
    //                 id: product._id,
    //                 title: product.title,
    //                 price: product.price,
    //                 image: product.imageUrl,
    //                 quantity: 1
    //             }
    //         })
    //     }

    //     console.log(existProduct);
    //     console.log(basket);
    // }

    const addCart = async (id, token) => {
        console.log('inside function');
        const res = await fetch(`/users/updatedata/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'x-access-token': token
            },
            body: JSON.stringify(basket)


        })
        const data = res.json()
        console.log(data);
    }
    useEffect(() => {
        console.log(basket, [user]);
        console.log(Quantity);
        if (user) {
            console.log('inside add to cart');
            addCart(user._id, user.token)
        }
    }, [user, basket])

    return (
        <>

            <div className='item-container'>
                {/* {headerItems && headerItems.map((item, index) => <Link to={item} className='item-container-p'><p>{item}</p></Link>)} */}
                {category && category.map((item, index) => <Link to={`products/getcategory/${item.categoryId}`} className='item-container-p'><p>{item.categoryname}</p></Link>)}
            </div>
            <div className="home">
                <div className="home-container">
                    <Slider images={BannerImages} />
                    <div className="home-row">
                        {products.slice(0, 2).map((item) => (
                            <Product
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                price={item.price}
                                image={item.imageUrl}
                                specification={item.specification} />
                        ))}
                    </div>

                    {/* <div className="slide-part">
                        <div className="left-slide">
                            <Slide title="Deal of the day" products={products} />
                        </div>
                    </div> */}
                    <div className="home-row">
                        {products.slice(2, 5).map((item) => (
                            <Product
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                price={item.price}
                                image={item.imageUrl}
                                specification={item.specification} />
                        ))}
                    </div>
                    <div style={{ marginTop: "40px", width: "100%" }}>
                        <BacktoTop />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
