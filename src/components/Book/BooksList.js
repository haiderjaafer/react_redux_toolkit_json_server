import React from 'react';

const BooksList = ({isLoading,books,isloggedIn}) => {

// why if not check on array books will got error in browser can not read properties of map coz we define books as array of null
// we can fix by books &&  mean that only if books array filled return it
// check for null like this !books ? null :
// or in the initialState assign to books array to empty array []

  const bookList = books.length > 0 ? books.map((item)=>(   // here check for null .... !books if? false will return null else : will return books.map

        
    <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
    <div>{item.title}</div>
    <div className='btn-group' role='group'>
      <button type='button' className='btn btn-primary'>
        Read
      </button>
      <button type='button' className='btn btn-danger' disabled={!isloggedIn}>
        Delete
      </button>
    </div>
  </li>



  )):"There is no books available";


  return (
    <div>
      <h2>Books List</h2>

     {isLoading ? ('loading...') :     // loading its ok with () or without ()
     
     <ul className='list-group'>{bookList} </ul>
     
     }

    </div>
  );
};

export default BooksList;
