import React, { Fragment, useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch,useSelector } from 'react-redux';
import './book.css';
import {getBooks} from "../../store/bookSlice";
const PostContainer = () => {

const {isLoading,books} = useSelector((state) => state.books);
const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  useEffect(()=>{
    console.log(" effect");
    dispatch(getBooks());   // here will call action getBooks() should () to call action or func

  },[dispatch]);

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} isloggedIn={isLoggedIn}  />
        </div>
        <div className='col side-line'>
          <BookInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
