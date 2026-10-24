"use client"
import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { label } from 'motion/react-client'
import { ArrowRight, Bike, User, UserCog } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { type } from 'os'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function EditRoleMobile() {
  const [roles, setRoles] = useState([
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ])
  const [selectedRole, setSelectedRole] = useState("")
  const [mobile, setMobile] = useState("")
  const { update } = useSession()
  const router = useRouter()
  const handleEdt = async () => {
    try {
      const result = await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile
      })
      await update({ role: selectedRole })
      router.push("/")

    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const checkForAdmin = async () => {
    try {
      const result = await axios.get("/api/check-for-admin")
        if(result.data.adminExist){
          setRoles(prev=>prev.filter(role=> role.id !== "admin"))
        }
    } catch (error) {
      console.log("check for admin error", error)
    }
  }
    checkForAdmin()
  }, [])
  return (
    <div className='flex flex-col  min-h-screen px-6 w-full items-center'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-3xl mid:text-4xl font-extrabold text-amber-700 text-center mt-8'>
        Select Your Role</motion.h1>
      <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole == role.id;
          return (
            <motion.div
              whileTap={{ scale: 0.94 }}
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2
              transition-all ${isSelected
                  ? "border-amber-700 bg-amber-100 shadow-lg"
                  : "border-gray-300 hover:border-amber-600 bg-white"
                }`}
            >
              <Icon />
              <span>{role.label}</span>
            </motion.div>
          )
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className='flex flex-col items-center mt-10'
      >
        <label htmlFor='mobile' className='text-gray-700 font-medium mb-2'>Enter Your Mobile No.</label>
        <input type="tel" id='mobile'
          className='w-64 mid:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:outline-none text-gray-800'
          placeholder='eg. 0000000000'
          onChange={(e) => setMobile(e.target.value)} />
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        disabled={!(selectedRole && mobile.length === 10)}
        className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 w-[200px] mt-20 ${selectedRole && mobile.length === 10
            ? "bg-amber-700 hover:bg-amber-900 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`} onClick={handleEdt}>
        Go to Home
        <ArrowRight />
      </motion.button>
    </div>
  )
}

export default EditRoleMobile
