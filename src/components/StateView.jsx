import React, { useEffect, useRef, useState } from 'react'
import UpdateImage from '../utils/updateImage';
import { BsGrid3X3GapFill } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import useToast from '../hooks/useToast'
import './notification.css'
const StateView = ({state}) => {
  const [data,setData]=useState(state)
  const [rowId,setRowId]=useState(null)
  const [variantsId,setVariantsId]=useState(null)
  const [showImageSelector,setShowImageSelector]=useState(false)
  const [content,setContent]=useState(null)
  const movingItem=useRef()
  const onTopOf=useRef()
  const [isDraggable,setIsDraggable]=useState(null)
  const [hoveredItem,setHoveredItem]=useState(null)
  const [noOfRows,setNoOfRows]=useState()
  const [toastComp,triggerToast]=useToast('center')
  useEffect(()=>{
    console.log('rendered')
    setNoOfRows(data[0].variants.length??0)
  },[])

  const addNewColumn=()=>{
    const dataCopy=[...data]
    dataCopy.map((value)=>value.variants.push(null))
    setData(dataCopy)
    setNoOfRows(noOfRows+1)
    triggerToast({type:"success",message:"New Varient added"})

  }
  const handleInsert=(image)=>{
    setShowImageSelector(!showImageSelector)
    console.log(image)

    console.log(rowId,variantsId)
    const newData=data.map((val)=>{
      if(val.id==rowId){
        val.variants[variantsId]=image
        const newVariants=[...val.variants]
        return {...val,variants:newVariants}
      }

      return val
    })
    setData(newData)

  }
  const handleClose=()=>{
    setShowImageSelector(!showImageSelector)
  }
  const handleDragStart=(e,id)=>{
    e.dataTransfer.dropEffect='move'
    setTimeout(()=>movingItem.current=id,0)
    setContent(data.find((cont)=>cont.id==id))
  }
  const handleDragEnter=(id)=>{
    onTopOf.current=id
  }
  const handleDragOver=()=>{
    const dataCopy=[...data]
    const movingItemPosition=data.findIndex((moveItem)=>moveItem.id==movingItem.current)
    const sibilingPosition=data.findIndex((sibiling)=>sibiling.id==onTopOf.current)
    dataCopy.splice(movingItemPosition,1)
    dataCopy.splice(sibilingPosition,0,content)
    setData(dataCopy)
  }
  const handleDragEnd=()=>{
    setContent(null)
    movingItem.current=null
  }
  const handleHover=(id)=>{
    setHoveredItem(id)
  }
  const handleDeleteRow=(id)=>{
    const newData=data.filter((val)=>id!==val.id)
    triggerToast({type:"success",message:"State deleted successfully"})
    setData(newData)
  }
  const addNewRow=()=>{
    const newRow={id:data.length+1,productRules:null,variants:[]}
    for (let i=0;i<noOfRows;i++){
      newRow.variants.push(null)
    }
    const newData=[...data,newRow]
    triggerToast({type:"success",message:"New State Added"})
    setData(newData)
  }
  let counter=1
  return (
    <>
    {/* This is for showing image selector*/}
    <div className='center-middle h-2/4'>
      <UpdateImage value={showImageSelector} handleClose={handleClose} handleInsert={handleInsert}/>
    </div>
    <div className='w-9/10 mx-auto '>
    <div className='overflow-x-auto relative whitespace-nowrap'>
    <table className='bg-gray-100 w-full rounded-xl mx-auto relative border-separate border-spacing-0' border="1">
    <thead>
      <tr align='center' >
        <th className='sticky left-0 bg-gray-100' width="100"> </th>
        <th className='sticky left-24 bg-gray-100' width="200"><div className='h-20 w-80 flex items-center justify-center'>Product Filter</div></th>

        {/* Variant headers are generate Variant1,2,3......*/}
        {[...Array(noOfRows)].map((_,i)=>{
          return i+1==1?<th width="100">Primary Variant</th>:<th width="100">Variant {i+1}</th>
        })}
      </tr>
    </thead>
    

    <tbody>
      {data.map((item)=>{
        return (<tr align="center" key={item.id} className={`${movingItem.current==item.id?"opacity-0":""}`} onMouseEnter={()=>handleHover(item.id)} onMouseLeave={()=>setHoveredItem(null)} draggable={isDraggable==item.id?true:false} onDragStart={(e)=>handleDragStart(e,item.id)} onDragOver={(e)=>{e.preventDefault();handleDragOver(e)}} onDragEnter={(e)=>handleDragEnter(item.id)} onDragEnd={handleDragEnd} >
          <td className='sticky left-0  bg-gray-100' >
            <div className='w-24 h-48 flex justify-center items-center'>
            <div className='flex flex-col'>
            {hoveredItem==item.id?<button onClick={()=>handleDeleteRow(item.id)}><MdDeleteForever size={24} style={{color:'red'}} /></button>:""}
            <div className='flex justify-center items-center'>{counter++}
            <button className='' onMouseEnter={()=>setIsDraggable(item.id)} onMouseLeave={()=>setIsDraggable(null)} onClick={()=>{console.log('clicked ')}}> 
                <BsGrid3X3GapFill />
            </button></div>
            </div></div>
          </td>
          <td className='sticky left-24  bg-gray-100' width="200"><div className='bg-white h-36 w-80 flex flex-wrap overflow-hidden justify-center items-center mx-8 rounded-md' >{item.productRules?item.productRules.map((eachRule,i)=>{ return <div className='mx-1 px-1 bg-gray-200 rounded-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>{eachRule}</div>}):<button className='bg-gray-100 px-4 rounded-md flex items-center justify-center shadow-black-500'><IoIosAdd size='24'/> Add Rules</button>}</div></td>
          {item.variants.map((variant,index)=>{
          return <td className='border-r-2'>
          <div className="bg-white h-36 w-36 flex justify-center items-center mx-5 rounded-md">{variant?<div className='flex flex-col justify-center items-center'><img className='h-28 w-28 object-contain' src={`./${variant.img}`} alt={variant.name} /><p className='truncate w-28'>{variant.name}</p></div>:<button className='flex items-center' onClick={()=>{setShowImageSelector(true);setRowId(item.id);setVariantsId(index)}}><IoIosAdd /> Add Variant</button>}</div>
          </td>
          })}
          <td className="w-36"><div className='w-16 h-36 flex justify-center items-center mr-9 '><button onClick={addNewColumn} className='w-8 h-8 flex justify-center items-center bg-white rounded-md'><IoIosAdd size="24"/></button></div></td>{/* This is for add new columns*/}
        </tr>)
      })}
    </tbody>
    <tfoot>
      <tr>
          <td className='sticky left-0' width='100' height='100'><div className='flex items-center justify-center w-24 h-28'><button onClick={addNewRow} className="w-8 h-8 rounded-md bg-white flex justify-center items-center"><IoIosAdd size='24'/></button></div></td>
      </tr>
    </tfoot>
    </table>
    </div>
    </div>
      {toastComp}
    </>
  )
}

export default StateView
