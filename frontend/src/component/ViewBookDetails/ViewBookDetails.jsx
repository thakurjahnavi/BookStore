import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Loader from "../Loader/Loader"

function ViewBookDetails() {
   const{id} = useParams();
   console.log(id);
   const[Data,setData] = useState();
   useEffect(()=>{
     const fetch = async()=>{
       const response = await axios.get(`http://localhost:1000/api/v1/get-book-byid/${id}`);
       console.log(response);
       setData(response.data.data)
     }
     fetch();
   },[])
  return (
        <>
        {Data && (   <div className='px-12 py-8 bg-zinc-900 flex'>
      <div className='bg-zinc-800 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center'><img src={Data.url} alt='imag..' className='h-[70vh]'/></div>
      <div className='p-4 w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
      <p className='text-zinc-400 mt-1'>bt {Data.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
      <p className='flex mt-4 items-center  justify-start text-zinc-400'>{Data.language}</p>
      <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : Rs {Data.price}{" "}</p>
      
      </div>
    </div>)} {!Data && (<div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/>{" "}</div>)}
        </>
  );
}

export default ViewBookDetails
