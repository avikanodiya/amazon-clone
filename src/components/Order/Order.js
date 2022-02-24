import React from 'react'
import "./Order.css"
import CartProduct from '../../pages/Cart/CartProduct'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
const Order = ({ order }) => {
    return (
        <div className="order">
            <p>{moment(order.date).format("DD/MM/YYYY")}</p>
            <p className="order-id"><small>{order._id}</small></p>
            {order.order?.map((item) => (
                <CartProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    hideButton={true} />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <h3 className="order-total">Order Total: {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={'₹'} />
        </div>
    )
}

export default Order