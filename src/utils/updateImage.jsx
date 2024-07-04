import React, { useEffect, useState } from 'react'
import '../components/notification.css'

//Products images harcoded values but can get from api
const products=[
  {img:'1.png',name:"single image Buy 1 Get 1"},
  {img:'2.png',name:"single image Buy 2 Get 1"},
  {img:'3.png',name:"multi img Baby Product sale"},
  {img:'4.png',name:"single image Clearnce sale"},
  {img:'5.png',name:"3 images discount 50"},
  {img:'6.png',name:"2 images fast selling segment"},
  {img:'7.png',name:"sale of the year"},
  {img:'8.png',name:"Buy 1 Get 1"},
  {img:'9.png',name:"multi image new fasion"},
  {img:'10.png',name:"fast growing segment"},
  {img:'11.png',name:"trendy fits"},
  {img:'12.png',name:"casual wear"},
]

import { IoIosClose , IoIosAdd} from "react-icons/io";
const UpdateImage = ({value,handleClose,handleInsert}) => {
 
const [showInsert,setShowInsert]=useState(null)
  useEffect(() => {
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [value]);

  const handleMouseEnter=(item)=>{
    setShowInsert(item)
  }
  const handleMouseLeave=()=>{
    setShowInsert(null)

  }

  return (

    <div className={` ${value?"":"hidden"} overflow-y-auto notification shadow-lg bg-cyan-500 shadow-cyan-500/50 rounded-md `}>
      <div className='flex items-center justify-between'>
      <span className='ml-2 mr-1 mb-4'>add new variant</span>
      <button className='mx-2 text-2xl mb-4' onClick={()=>handleClose()}><IoIosClose /></button>
      </div>
      <div className='grid grid-cols-3 grid-flow-row gap-4 '>
          {products.map((eachProduct,i)=>{
            return <div key={i} className='h-32 w-32 bg-red flex justify-center items-center relative' onMouseEnter={()=>handleMouseEnter(eachProduct)} onMouseLeave={()=>handleMouseLeave()}>
 <img src={`./${eachProduct.img}`} alt={eachProduct.name}/>
          <div className={`${showInsert&&showInsert.img==eachProduct.img?"":"hidden"} absolute center-middle bg-gray-300 shadow-green-500/50 rounded-md`}><button className='flex justify-center' onClick={()=>handleInsert(showInsert)}><IoIosAdd size="24"/>Insert</button></div>
          </div>
          })}
       
       </div> 
    </div>
  )
}

export default UpdateImage
