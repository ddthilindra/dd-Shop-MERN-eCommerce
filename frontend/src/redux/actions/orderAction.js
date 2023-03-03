import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstansts";
import axios from 'axios'

// CREATE ORDER ACTION CREATOR
export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
  
      // token destructure from getState , from userInfo
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      
      const { data } = await axios.post(`/api/orders`, order, config);
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// GET ORDER DETAILS CREATOR
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      // token destructure from getState , from userInfo
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
// PAY ORDER CREATOR
export const payOrder = (orderId,paymentResult) => async (dispatch, getState) => { // paymentResult comming from paypal
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    // token destructure from getState , from userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };
    
    const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LIST MY ORDER CREATOR
export const listMyOrder = () => async (dispatch, getState) => { 
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    // token destructure from getState , from userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LIST ALL ORDER
export const listOrders = () => async (dispatch, getState) => { 
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    // token destructure from getState , from userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
