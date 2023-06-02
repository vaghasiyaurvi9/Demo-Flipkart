import React, { useState } from 'react'
import { ItemContext } from './Context'
import Product from './Product'
import ProductTable from './ProductTable'

const ProductIndex = () => {
  const [selectedId, setSelectedId] = useState(0)
  return (
    <>
      <ItemContext.Provider value={{ selectedId, setSelectedId }}>
        <Product />
        <ProductTable />
        
      </ItemContext.Provider>

    </>
  )
}

export default ProductIndex
