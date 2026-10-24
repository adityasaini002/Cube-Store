'use client'
import { ArrowRight, CheckCircle, CheckCircleIcon, Package } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-linear-to-b from-red-50 to-white'>
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className='relative'
            >
                <CheckCircle className='text-amber-500 w-24 h-24 md:w-28 md:h-28' />
                <motion.div className='absolute inset-0'
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0.3, 0, 0.3], scale: [1, 0.6, 1] }}
                    transition={{
                        repeat: Infinity, duration: 2,
                        ease: "easeInOut"
                    }}
                >
                    <div className='w-full h-full rounded-full bg-amber-200 blur-2xl' />
                </motion.div>

            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className='text-3xl md:text-4xl font-bold text-amber-600 mt-6'>
                Order Placed Successfully!
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className='text-lg md:text-xl text-gray-700 mt-4 max-w-md'>
                Thank you for shopping with CubeMart. Your order is being processed and will be delivered soon.
                <span className='font-semibold text-amber-700 '> My Orders</span> section
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className='mt-10'
            >
                <Package className='text-amber-500 w-16 h-16 md:h-20 md:w-20  mt-4' />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className='mt-12'
            >
                <Link href="/user/my-orders" >
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.93 }} className='flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold px-8 py-3 rounded-full shadow-lg transition-all  '>
                        Go to My Orders <ArrowRight />
                    </motion.div>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className='absolute top-2 left-0 w-full h-full pointer-events-none'>
                <div className='absolute top-20 left-[10%] w-2 h-2 bg-amber-400 rounded-full animate-bounce' />
                <div className='absolute top-32 left-[30%] w-2 h-2 bg-amber-400 rounded-full animate-pulse' />
                <div className='absolute top-26 left-[50%] w-2 h-2 bg-amber-400 rounded-full animate-bounce' />
                <div className='absolute top-18 left-[70%] w-2 h-2 bg-amber-400 rounded-full animate-pulse' />
                <div className='absolute top-24 left-[90%] w-2 h-2 bg-amber-400 rounded-full animate-bounce'/>
            </motion.div>

        </div>
    )
}

export default page
