'use client'
import React from 'react'
import { motion } from "motion/react"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, X } from 'lucide-react'
import Link from 'next/link'
function Footer() {
    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='bg-linear-to-r from-amber-600 to-amber-700 text-white mt-20'>
            <div className='w-[90%] md:w-[80%] mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-amber-500/40'>
            <div>
                <h2 className='text-2xl font-bold mb-3 '>Cubemart</h2>
                <p className='text-sm text-amber-100 leading-relaxed'>Cubemart brings fresh groceries and daily essentials right to your doorstep with fast delivery, real-time order tracking, and friendly support. Whether you need everyday staples, snacks, or specialty items, our easy-to-use app makes shopping simple and convenient. Enjoy trusted quality, transparent pricing, and the peace of mind that your order is handled by dedicated delivery partners</p>

            </div>
            <div>
                <h2 className='text-xl font-semibold mb-3'>Quick Links</h2>
                <ul className='space-y-2 text-amber-100 text-sm'>
                    <li><Link href="/" className='hover:text-white transition'>Home</Link></li>
                    <li><Link href="/user/cart" className='hover:text-white transition'>Cart</Link></li>
                    <li><Link href="/my-orders" className='hover:text-white transition'>My Orders</Link></li>
                </ul>
            </div>
            <div>
                <h3 className='text-xl font-semibold mb-3' >Contact Us</h3>
                <ul className='space-y-2 text-amber-100 text-sm'>
                    <li className='flex items-center gap-2'>
                        <MapPin size={16}/> Mumbai, India
                    </li>
                    <li className='flex items-center gap-2'>
                       <Phone size={16}/> +91 0000000000
                    </li>
                    <li className='flex items-center gap-2'>
                       <Mail size={16}/> support@cubemart.in
                    </li>
                </ul>
            <div className='flex gap-4 mt-4'>
             <Link href="https://facebook.com" target='_blank'>
             <Facebook className='w-5 h-5 hover:text-white transition'/>
             </Link>
             <Link href='https://instagram.com' target='_blank'>
             <Instagram className='w-5 h-5 hover:text-white transition'/>
             </Link>
             <Link href='https://twitter.com' target='_blank'>
             <Twitter className='w-5 h-5 hover:text-white transition'/>
             </Link>
            </div>
            </div>
            </div>
            <div className='text-center py-4 text-sm text-amber-100 bg-text-800/40'>
            © {new Date().getFullYear()} <span className='font-semibold'>Cubemart</span>. All rights reserved.

            </div>
        </motion.div>
    )
}

export default Footer
