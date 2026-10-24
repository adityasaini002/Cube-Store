'use client'
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bike, Heart, ShoppingBasket } from 'lucide-react';
type proptype={
    nextStep:(s:number)=>void
}
function Welcome({nextStep}:proptype) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-red-100 to-white">
     <motion.div
     initial={{ opacity: 0, y: -10 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     className='flex items-center gap-3'>
         <Heart className='w-10 h-8 text-amber-900'/>
        <h1 className='text-4xl mid:text-5xl font-extrabold text-amber-900 font-[Pacifico]' >
            Cubemart
        </h1>
     </motion.div>
      
      <motion.p
      initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.3 }}
     className='mt-4 text-gray-700 text-lg mid:text-xl max-w-lg'>
        Melt‑in‑your‑mouth chocolate, crafted slowly from the finest cacao, delivered fresh to your door. Treat yourself to a moment of pure, silky indulgence in every bite.
      </motion.p>
      <motion.div
       initial={{ opacity: 0, scale: 0.9 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.6, delay: 0.5 }}
     className='flex items-center justify-center gap-10 mt-10'>
        <ShoppingBasket className='w-24 h-24 mid:w-32 mid:h-32 text-amber-900 drop-shadow-md'/>
       
        <Bike className='w-24 h-24 mid:w-32 mid:h-32 text-orange-500 drop-shadow-md'/>

      </motion.div>

      <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className='inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-900 text-white font-semibold py-3 px-8 rounded-2xl shadow-md  transition-all duration-200 mt-10'
    onClick={() => nextStep(2)}>
      Next
      <ArrowRight/>

      </motion.button>
    </div>
  );
}

export default Welcome;
