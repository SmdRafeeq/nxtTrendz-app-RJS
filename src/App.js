import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(preState => ({
      cartList: preState.cartList.map(eachCart => {
        if(id === eachCart.id){
          const updateQty = eachCart.quantity + 1
          return {...eachCart, quantity: updateQty}
        }
        return eachCart
      })
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(eachCart => eachCart.id === id)

    if(productObj.quantity > 1){
      this.setState(preState => ({
        cartList: preState.cartList.map(eachItem => {
          if(id === eachItem.id){
            const updateQty = eachItem.quantity - 1
            return {...eachItem, quantity: updateQty}
          }
          return eachItem
        })
      }))
    }
    else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({cartList: updateList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObj = cartList.find(eachCart => eachCart.id === product.id)

    if(productObj){
      this.setState(preState => ({
        cartList: preState.cartList.map(eachItem => {
          if(productObj.id === eachItem.id){
            const updateQty = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updateQty}
          }
          return eachItem
        })
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
