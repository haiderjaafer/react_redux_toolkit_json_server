import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

    const  {rejectWithValue,getState}= thunkAPI;


    try{
        console.log("getState"+ getState()) // if without () it will reference of function if with () i will call the function
        // getState() can get to reach into global state


        console.log(" inserBooks thunk bookData "+ bookData.title + bookData.price + bookData.description);

        bookData.userName = getState().auth.name;  // userName is new property in object bookData and finally will inserted in database 

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

        return data;



    }catch(error){

       // console.log(error);
       return rejectWithValue(error.message);  // rejectWithValue is function 
    }


});


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
         }
    }
})

export default bookSlice.reducer