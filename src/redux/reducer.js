const products = [];
const brand = [];
const category = [];
export const initialState = {
    basket: [],
    user: null,
    Quantity: 0
}
const cartRes = [];

export const getProductsReducers = (state = { products }, action) => {
    switch (action.type) {
        case "SUCCESS_GETPRODUCTS":
            return { products: action.payload }
        case "FAIL_GETPRODUCTS":
            return { error: action.payload }
        default: return state
    }
}

export const getBrandReducers = (state = { brand }, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SUCCESS_GETBRAND':
            return { brand: action.payload }
        case "FAIL_GETBRAND":
            return { error: action.payload }
        default: return state
    }
}

export const getCategoryReducers = (state = { category }, action) => {
    switch (action.type) {
        case "SUCCESS_GETCATEGORY":
            return { category: action.payload }
        case 'FAIL_GETCATEGORY':
            return { error: action.payload }
        default: return state
    }
}

export const addCartReducers = (state = { cartRes }, action) => {
    switch (action.type) {
        case "SUCCESS_ADDCART":
            return console.log(action.payload)
        case 'FAIL_ADDCART':
            return console.log(action.payload)
        default: return state
    }
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => amount + (parseInt(item.price) * parseInt(item.quantity)), 0)
}

export const getBasketQuantity = (basket) => {
    basket?.reduce((quantity, item) => quantity + item.quantity, 0)
}

const reducer = (state, action) => {
    console.log(action.type);
    console.log(action.item);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket]
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `cant remove product (id:${action.id}) as its not in the basket`
                )
            };
            return {
                ...state,
                basket: newBasket
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_QUANTITY":
            return {
                ...state,
                Quantity: action.Quantity
            }
        default:
            return state;

    }
}

export default reducer;