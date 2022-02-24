import { getProductsReducers, getCategoryReducers, addCartReducers, getBrandReducers } from './reducer'
import { combineReducers } from 'redux'

const rootreducers = combineReducers({
    getproductsdata: getProductsReducers,
    getcategorydata: getCategoryReducers,
    addcartdata: addCartReducers,
    getbranddata: getBrandReducers
})

export default rootreducers