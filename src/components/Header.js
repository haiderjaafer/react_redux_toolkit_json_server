import React, { Fragment } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logInOut } from '../store/authSlice';


const Header = () => {

  const dispatch = useDispatch() ;
  const {error} = useSelector(state => state.books)
  const {isLoggedIn} = useSelector((state) => state.auth);


  return (  // here if there is error print it if no error dont print any thing
<Fragment>
{ error && (<div className='alert alert-danger mb-0' role='alert'>  
  {error}

</div>)}

<nav className='navbar navbar-dark bg-dark'>
      <span className='navbar-brand mb-0 h1'>My Books</span>

      <button className='btn btn-outline-primary' type='submit' onClick={()=>dispatch(logInOut())}>
        {isLoggedIn ? 'log Out' : 'Log In'}

      </button>
    </nav>

</Fragment>
  );
};

export default Header;
