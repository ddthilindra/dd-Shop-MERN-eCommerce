import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {addToCart} from '../redux/actions/cartActions'

const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = params.id;
  
  // location.search -> console -> ?qty=3 -> then split 3
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // get cart item from state
  const cart=useSelector(state=>state.cart)
  const {cartItems}=cart
  console.log(cartItems)

  const dispatch = useDispatch();

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  }, [dispatch,productId,qty]);
  return <div>Cart</div>;
};

export default CartScreen;
