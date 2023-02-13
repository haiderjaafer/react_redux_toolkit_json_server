import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

 export const getBooks = createAsyncThunk('book/getBooks',async(_,thunkAPI)=>{   // typePrefix is begin with name of slice 'book/getBooks' coz will need this name to link with createAsyncThunk with bookSlice

    const  {rejectWithValue}= thunkAPI;

    try{

        const  res = await fetch("http://localhost:3009/books");
        const data = res.json();

        return data;



    }catch(error){

       // console.log(error);
       return rejectWithValue(error.message);
    }

});


export const insertBook = createAsyncThunk(
    'book/insertBook', 
    async(bookData,thunkAPI)=>{

    const  {rejectWithValue,getState,dispatch}= thunkAPI;  // topic here will send dispatch action from another dispatch action or inside action


    try{
        console.log("getState"+ getState()) // if without () it will reference of function if with () i will call the function
        // getState() can get to reach into global state


        console.log(" inserBooks thunk bookData "+ bookData.title + bookData.price + bookData.description);

        bookData.userName = getState().auth.name;  // userName is new property in object bookData and finally will inserted in database 

        //  dispatch(deleteBook({id:1})); from lesson 18
        dispatch(deleteBook({id:1}));  // here will dispatch action deleteBook() in pending action ... before fetch operation method  /// here we can use getState( method to get last book id inserted and use that id in dispatch action dispatch(deleteBook({id:6}))) 

        const  res = await fetch("http://localhost:3009/books" , {

        method:'POST',
        //body:JSON.stringify({"title":"toefl","price":50,"description":"pppppppppp"}),
        body: JSON.stringify(bookData),

        // headers:{
        //     'Content-type':'application/json, charset=UTF-8',
        // }
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },



        });

        const data = res.json();

        dispatch(logInsert({name:"insertBook",status:'success'})); // will send dispatch action and send object before return and after fetch operation method 

        return data;



    }catch(error){
        dispatch(logInsert({name:"insertBook",status:'failed'})); // will send object 
       // console.log(error);
       return rejectWithValue(error.message);  // rejectWithValue is function 
    }


});


export const deleteBook  = createAsyncThunk('book/deleteBook',async(item,thunkAPI)=>{   // id is in arg

    const  {rejectWithValue}= thunkAPI;


    try{
       


        

 

        await fetch(`http://localhost:3009/books/${item.id}` , {

        method:'DELETE',

       

      
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },



        });

       

        return item;



    }catch(error){

      
       return rejectWithValue(error.message);  
    }


})


// we make more slices example slice for addbooks slice for gettbooks slice for specific books and so on
const bookSlice =createSlice({
    name:'book',
    initialState:{books:[],isLoading:false,error:null},
    extraReducers:
    
//     (builder)=>{

//         console.log("action");

//   builder.addCase(getBooks.fulfilled,(state,action)=>{
//     console.log(action);

//   })


//     }
    
    
    {


    // get books
        [getBooks.pending]:(state,action)=>{ 
            state.isLoading = true;
            console.log("action pending");
            console.log(action);
            state.error = null;
        },
        [getBooks.fulfilled]:(state,action)=>{
            state.isLoading = false;
            console.log("action fulfilled");
            console.log(action);
            state.books= action.payload;
         },
        [getBooks.rejected]:(state,action)=>{
            state.isLoading = false;
            console.log("action rejected");
            console.log(action);
            state.error = action.payload;
         },

         // insert book
         [insertBook.pending]:(state,action)=>{ 
            state.isLoading = true;
            console.log("insert action pending");
            console.log(action);
            state.error = null;
        },
        [insertBook.fulfilled]:(state,action)=>{
            state.isLoading = false;
            console.log("insert action fulfilled");
            console.log(action);
            console.log("action.payload..." +action.payload);
            state.books.push(action.payload);   // books is defined as array in initialstate so we push data into array into it
         },
        [insertBook.rejected]:(state,action)=>{
            state.isLoading = false;
            console.log("insert action rejected");
            console.log(action);
            state.error = action.payload;
         },

                  // delete book
                  [deleteBook.pending]:(state,action)=>{ 
                    state.isLoading = true;
                  
                    state.error = null;
                },
                [deleteBook.fulfilled]:(state,action)=>{
                    state.isLoading = false;
                    console.log("from delete func thunk"+action.payload); //  action.payload is what is return from response in deleteBook createAsyncThunk

                    state.books = state.books.filter(el => el.id !== action.payload.id) // action.payload is the id we passed from page... here return to me all elements except that was passed from page
               
                    
                 },
                [deleteBook.rejected]:(state,action)=>{
                    state.isLoading = false;
                 
                    state.error = action.payload;
                 },
    }
})

export default bookSlice.reducer