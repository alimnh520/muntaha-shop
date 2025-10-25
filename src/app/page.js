import React from 'react'
import Animation from './components/Animations'
import OfferProductsPage from './components/OfferedProduct'
import CategoriesPage from './components/Category'
import AllProducts from './components/AllProducts'

const page = () => {
  return (
    <div className='mx-auto flex flex-col sm:w-[1180px] w-full gap-y-5 bg-[#f5f5f5] sm:px-4 sm:pt-4'>
      <Animation/>
      <OfferProductsPage/>
      <CategoriesPage/>
      <AllProducts/>
    </div>
  )
}

export default page