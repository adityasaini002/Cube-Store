import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import { connect } from 'http2'
import connectDb from '@/lib/db'
import Grocery, { IGrocery } from '@/models/grocery.model'
import GroceryItemCard from './GroceryItemCard'
import Footer from '@/components/Footer'

async function UserDashboard({groceryList}:{
  groceryList:IGrocery[]
}) {
  
await connectDb()
const plainGrocery=JSON.parse(JSON.stringify(groceryList))


   return (
    <>
      <HeroSection />
      <CategorySlider/>
      <div className='w-[90%] md:w-[80%] mx-auto mt-10'>
        <h2 className='text-2xl md:text-3xl font-bold text-amber-600 mb-6 text-center'>Popular Items</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
           {plainGrocery.map((item: any, index: number)=>(
        <GroceryItemCard item={item} key={index}/>
      ))}
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default UserDashboard
