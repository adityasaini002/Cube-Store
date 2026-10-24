import { getSocket } from '@/lib/socket'
import { IMessage } from '@/models/message.model'
import axios from 'axios'
import { Loader, Loader2, Send, SparkleIcon } from 'lucide-react'
import mongoose, { set } from 'mongoose'
import { AnimatePresence, motion } from 'motion/react'
import { s } from 'motion/react-client'
import React, { use, useEffect, useState } from 'react'
type props={
    orderId:mongoose.Types.ObjectId,
    deliveryBoyId:mongoose.Types.ObjectId,
}
function DeliveryChat({orderId,deliveryBoyId}:props) {
const [newMessage, setNewMessage] = useState("");
const [messages, setMessages] = useState<IMessage[]>([]);
const chatBoxRef=React.useRef<HTMLDivElement>(null)
const [loading,setLoading]=useState(false)
const [suggestions,setSuggestions]=useState<string[]>([])


useEffect(() => {
  const socket = getSocket();
  socket.emit("jion-room", orderId);
    socket.on("send-message",(message)=>{
    if(message.roomId===orderId){
      setMessages(prev=>[...prev!,message])
    }}
  )
   return () => {socket.off("send-message")}
}, [orderId]);

const sendMsg = () => {
  const socket = getSocket();
  if (!newMessage.trim()) return; // Prevent empty messages
  const message = {
    roomId: orderId,
    text: newMessage,
    senderId: deliveryBoyId,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };
  socket.emit("send-message", message);

  setNewMessage("");
};
useEffect(() => {
  chatBoxRef.current?.scrollTo({
    top: chatBoxRef.current.scrollHeight,
    behavior: "smooth"
  })
},[messages])

useEffect(() => {
  const getAllMessages = async () => {
    try {
      // Fetch messages from the correct endpoint
      const result = await axios.post("/api/chat/messages", { roomId: orderId });
      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  getAllMessages();
}, [orderId]);

const getSuggestion=async()=>{
  setLoading(true)
  try {

    const lastMessage=messages.filter(m=>m.senderId!==deliveryBoyId)?.at(-1)
    const result=await axios.post("/api/chat/ai-suggestions",{message:lastMessage?.text,role:"delivery_boy"})
    const suggestionsData = Array.isArray(result.data) ? result.data : result.data?.suggestions || []
    setSuggestions(suggestionsData)
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}


   
  return (
    <div className='bg-white rounded-3xl shadow-lg border p-4 h-[430px] flex flex-col'>

      <div className='flex justify-between items-center mb-3'>
        <span className='font-semibold text-gray-700 text-sm'>Quick Replies</span>
        <motion.button
        whileTap={{scale:0.9}}
        disabled={loading}
        onClick={getSuggestion}
        className='px-3 py-1 text-xs flex items-center gap-1 text-purple-700 rounded-full shadow-sm border border-purple-200 cursor-pointer'
        ><SparkleIcon size={14}/>{loading?<Loader className='w-5 h-5 animate-spin'/>:"AI Suggest"}</motion.button>
      </div>

      <div className='flex gap-2 flex-wrap mb-3'>
        {suggestions.map((s,i)=>(
          <motion.div
          key={i}
          whileTap={{scale:0.92}}
          className='px-3 py-1 text-xs bg-amber-50 border-amber-200 text-amber-700 rounded-full cursor-pointer'
          onClick={()=>setNewMessage(s)}>
            {s}
          </motion.div>
        ))}
      </div>
      <div className='flex-1 overflow-y-auto p-2 space-y-3 'ref={chatBoxRef}>
       <AnimatePresence>
        {messages?.map((msg,index)=>(
          <motion.div
          key={index}
          initial={{opacity:0,y:15}}
          animate={{opacity:1,y:0}}
          exit={{opacity:0}}
          transition={{duration:0.2}}
          className={`flex ${msg.senderId==deliveryBoyId?"justify-end":"justify-start"}`}
          >
          <div className={`px-4 py-2 max-w-[75%] rounded-2xl shadow
            ${
              msg.senderId===deliveryBoyId
              ?"bg-amber-600 text-white rounded-br-none"
              :"bg-gray-100 text-gray-800 rounded-bl-none"
            }`}>
            <p className=''>{msg.text}</p>
            <p className='text-[10px] opacity-70 mt-1 text-right'>{msg.time}</p>
          </div>
          </motion.div>
        ))}
       </AnimatePresence>
      </div>
      <div className='flex gap-2 mt-3 border-t pt-3'>
        <input type="text" placeholder='Type a Message...' className='flex-1 bg-gray-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-amber-500'value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
        <button className='bg-amber-600 hover:bg-amber-700 p-3 rounded-xl text-white'onClick={sendMsg} ><Send size={18}/></button>

      </div>
    </div>
  )
}

export default DeliveryChat
