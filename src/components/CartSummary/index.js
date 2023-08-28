import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
    <CartContext.Consumer>
        {value => {
            const {cartList} = value
            let total = 0
            cartList.forEach(eachCart => {
                total += eachCart.price * eachCart.quantity
            })

            return(
                <>
                    <div className='cart-summary-con'>
                        <h1 className='total-value'>
                            <span className='total-label'>Order Total:
                            </span> Rs {total}/-
                        </h1>
                        <p className='total-items'>{cartList.length} Items in cart</p>
                        <button className='checkout-btn d-sm-none' type='button'>Checkout</button>
                    </div>

                </>
            )
        }}
    </CartContext.Consumer>
)

export default CartSummary