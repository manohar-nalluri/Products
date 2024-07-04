import { Fa0,Fa1,Fa2,Fa3,Fa4,Fa5,Fa6,Fa7,Fa8,Fa9 } from "react-icons/fa6";
import React from 'react'
const numToIconLink={
  "0":<Fa0/>,
  "1":<Fa1/>,
  "2":<Fa2/>,
  "3":<Fa3/>,
  "4":<Fa4/>,
  "5":<Fa5/>,
  "6":<Fa6/>,
  "7":<Fa7/>,
  "8":<Fa8/>,
  "9":<Fa9/>
}


const NumToIcons = ({num}) => {
  let stringified=num.toString().split('');
  
  return (
    <span className="flex mx-0" >{stringified.map((e)=>{return <span style={{ margin: 0, padding: 0 }}>{numToIconLink[e]}</span>})}</span>
  )
}

export default NumToIcons
