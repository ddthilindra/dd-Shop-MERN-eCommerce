import React, { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = params.id;
  const dispatch = useDispatch();

  // get user info from state
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // get user update from state , need know success or not
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate){
        dispatch({type: USER_UPDATE_RESET})
        navigate('/admin/userlist')
    }else{
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
          } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
          }
    }
    
  }, [dispatch, user.name, user._id, user.email, user.isAdmin, userId,successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          error && <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
