import React from 'react'

export const rules=[
  ["tags","contains","_label:new",],
  ["discountPercentage","is","0"],
  ["tags","containing","onSale"],
  ["imageProduct.list 2","is","empty"],
]

const AddRules = ({value,handleClose,handleInsert}) => {
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

  
   return (

    <div className={` ${value?"":"hidden"} overflow-y-auto notification shadow-lg bg-cyan-500 shadow-cyan-500/50 rounded-md `}>
      <div className='flex items-center justify-between'>
      <span className='ml-2 mr-1 mb-4'>add new variant</span>
      <button className='mx-2 text-2xl mb-4' onClick={()=>handleClose()}><IoIosClose /></button>
      </div>
      <div className='grid grid-cols-3 grid-flow-row gap-4 '>
          {rules.map((eachProduct,i)=>{
            return <div>{eachProduct.map((eachItem,j)=>{
            return <div className='bg-gray-100 rounded-md px-1 mx-1'>{eachItem}</div>
          })}</div>
        })}
       
       </div> 
    </div>
  

    
  )
}

export default AddRules
