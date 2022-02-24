export const getProducts = () => async (dispatch) => {
    try {
        const data = await fetch("/products/getproduct", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        console.log(res)
        dispatch({ type: "SUCCESS_GETPRODUCTS", payload: res })
    } catch (error) {
        dispatch({ type: "FAIL_GETPRODUCTS", payload: error.response })
    }
}

export const getBrand = () => async (dispatch) => {
    try {
        const data = await fetch("/products/getbrand", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        console.log(res);
        dispatch({ type: "SUCCESS_GETBRAND", payload: res })
    } catch (error) {
        dispatch({ type: 'FAIL_GETBRAND', payload: error.response })
    }
}

export const getCategory = () => async (dispatch) => {
    try {
        const data = await fetch("/products/getcategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        console.log(res);
        dispatch({ type: "SUCCESS_GETCATEGORY", payload: res })
    } catch (error) {
        dispatch({ type: "FAIL_GETCATEGORY", payload: error.response })
    }
}

export const addCart = (id, token, basket) => async (dispatch) => {
    try {
        const data = await fetch(`/users/updatedata/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'x-access-token': token
            },
            body: JSON.stringify({
                basket
            }),

        })
        const res = data.json()
        console.log(data);
        dispatch({ type: "SUCCESS_ADDCART", payload: res })
    } catch (error) {
        dispatch({ type: "FAIL_ADDCART", payload: error.response })
    }

}