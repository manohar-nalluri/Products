import React from 'react'

export const rules=[
  ["tags","contains","_label:new",],
  ["discountPercentage","is","0"],
  ["tags","containing","onSale"],
  ["imageProduct.list 2","is","empty"],
]

const AddRules = () => {
  return (
    <h1>add rules</h1>
  )
}

export default AddRules
