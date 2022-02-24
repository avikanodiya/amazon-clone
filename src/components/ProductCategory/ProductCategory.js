import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getBrand } from '../../redux/action'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import { useStateValue } from '../../stateProvider'
import Product from '../Product/Product'
import 'bootstrap/dist/css/bootstrap.min.css'
import Divider from '@mui/material/Divider';

const ProductCategory = () => {
    const { products } = useSelector(state => state.getproductsdata)
    const { brand } = useSelector(state => state.getbranddata)
    const [mainproduct, setMainproduct] = useState([])
    const [product, setProduct] = useState([])
    const [cloneProduct, setCloneProduct] = useState([])
    const [brandProduct, setBrandProduct] = useState([])
    const [{ state, basket }, dispatch] = useStateValue();
    const [brandState, setBrandState] = useState({})
    const { categoryId } = useParams("")
    console.log(products);
    console.log(brand);
    const dispach = useDispatch();
    useEffect(() => {
        dispach(getProducts());
        dispach(getBrand());
    }, [dispach])
    const filteredArray = [];

    const getProductByCatId = async () => {
        const res = await fetch(`/products/getcategory/${categoryId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        console.log(data);
        if (res.status !== 201) {
            console.log('data not available');
        } else {
            setProduct(data)
            setCloneProduct(data)
            setMainproduct(data)
            console.log(data);
        }
    }

    // useEffect(() => {
    //     
    // }, [product])

    const handleBrand = (e) => {
        console.log(e.target.checked);
        console.log(e.target.value);
        if (e.target.checked) {
            setBrandState({ ...brandState, [e.target.value]: e.target.checked })
        } else if (!e.target.checked) {
            const company = e.target.value
            const updatedBrand = brandState
            delete updatedBrand[company]
            console.log(updatedBrand);
            const temp = { ...updatedBrand }

            setBrandState(temp)
        }
        console.log(brandState);
    }


    useEffect(() => {
        console.log(cloneProduct);
        if (Object.keys(brandState).length === 0) {
            setProduct(cloneProduct)
        } else {
            console.log(Object.keys(brandState).length);
            Object.keys(brandState).map((item) => {
                console.log(item);
                const filtered = product.filter(i => i.company === item)
                console.log(filtered);
                filteredArray.push(filtered[0])
                console.log(filteredArray);
                setProduct(filteredArray)
                console.log(brandProduct);
            })
            console.log('hi');
        }


    }, [brandState, setBrandState])

    useEffect(() => {
        getProductByCatId()
        console.log(brand);
    }, [])

    
    // useEffect(() => {
    //     console.log(brandState);
    //     setProduct(brandProduct)
    // }, [brandState])

    return (
        <>
            <div className="row">
                <div className="filter col-2 border-end ms-2">
                    <div className="price mt-3">
                        <h5>Price</h5>
                        <p onClick={() => { setProduct(mainproduct.filter(item => item.price < 1000)) }}>under ₹1000</p>
                        <p onClick={() => { setProduct(mainproduct.filter(item => item.price > 1000 && item.price < 5000)) }}>under ₹1000 - ₹5000</p>
                        <p onClick={() => { setProduct(mainproduct.filter(item => item.price > 5000 && item.price < 10000)) }}>under ₹5000 - ₹10000</p>
                        <p onClick={() => { setProduct(mainproduct.filter(item => item.price > 1000 && item.price < 20000)) }}>under ₹10000 - ₹20000</p>
                        <p onClick={() => { setProduct(mainproduct.filter(item => item.price > 20000)) }}>over ₹20000</p>
                    </div>
                    <div className="brands mt-2">
                        <h5>Brands</h5>

                        {brand.map((item) => (
                            <div className="form-check" key={item._id}>
                                <input type="checkbox" className="form-check-input" onChange={(e) => handleBrand(e)} value={item.brandName} />
                                <label htmlFor="" className="form-check-label">{item.brandName}</label>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="col-7">
                    {product.map((product) => (
                        <Product
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            price={product.price}
                            image={product.imageUrl}
                            specification={product.specification} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductCategory;
