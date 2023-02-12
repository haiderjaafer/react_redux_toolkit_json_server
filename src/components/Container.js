import React from 'react';

const Container = ({ children }) => {    // this container is wrapping booklist and bookdetail
  return <div className='container'>{children} </div>;
};

export default Container;
