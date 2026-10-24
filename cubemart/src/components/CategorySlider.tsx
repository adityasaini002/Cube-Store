"use client";
import React, { useEffect } from "react";
import Choco from "@/assets/inclined-chocolate-bar.png";
import Almond from "@/assets/almond.png";
import Stick from "@/assets/travel.png";
import Cake from "@/assets/birthday-cake.png";
import CakeSlice from "@/assets/cake.png";
import Lollipop from "@/assets/lollipop.png";
import Candy from "@/assets/anise-candy.png";
import Cookie from "@/assets/cookie.png";
import Gift from "@/assets/surprise.png";
import Milk from "@/assets/milk-bottle.png";

import { motion } from "motion/react";
import { ChevronLast, ChevronLeft, ChevronRight, } from "lucide-react";

export default function CategorySlider() {
  const categories = [
    { id: 1, name: "Chocalates & Dark Chocalate", img: Choco, bgColor: "bg-yellow-100" },
    { id: 2, name: "Candies & Lollipops", img: Lollipop, bgColor: "bg-pink-100" },
    { id: 3, name: "Fruit Candies & Candies Stick", img: Stick, bgColor: "bg-red-100" },
    { id: 4, name: "Toffy & Marshmallow", img: Candy, bgColor: "bg-orange-100" },
    { id: 5, name: "Biscuits & Cookies", img: Cookie, bgColor: "bg-brown-100" },
    { id: 6, name: "Brownies & Chocalate Cakes", img: CakeSlice, bgColor: "bg-purple-100" },
    { id: 7, name: "Cupcakes & Cakes", img: Cake, bgColor: "bg-pink-200" },
    { id: 8, name: "Almond Chocalate & Peenut Chocalate", img: Almond, bgColor: "bg-yellow-200" },
    { id: 9, name: "Chocalate Gift Boxes & Custom Name Chocalate", img: Gift, bgColor: "bg-green-100" },
    { id: 10, name: "Milk & Chocalate Milk", img: Milk, bgColor: "bg-blue-100" },
  ];
  const [showLeft, setShowLeft] = React.useState<Boolean>();
  const [showRight, setShowRight] = React.useState<Boolean>();
  const scrollRef = React.useRef<HTMLDivElement>(null);
 const scroll = (direction: "left" | "right") => {
  if(!scrollRef.current) return
  const scrollAmount =direction=="left"?-300:300
  scrollRef.current.scrollBy({left:scrollAmount,behavior:"smooth"})
 }
 const checkScroll = () => {
  if(!scrollRef.current) return
 const {scrollLeft,scrollWidth,clientWidth} = scrollRef.current
  setShowLeft(scrollLeft>0)
  setShowRight((scrollLeft+clientWidth)<=scrollWidth-5)
 }


 useEffect(()=>{
   const autoScroll = setInterval(()=>{
     if(!scrollRef.current) return
 const {scrollLeft,scrollWidth,clientWidth} = scrollRef.current
 if(scrollLeft+clientWidth>=scrollWidth-5){
  scrollRef.current.scrollTo({left:0,behavior:"smooth"})
 }else{
  scrollRef.current.scrollBy({left:300,behavior:"smooth"})
 }
    },2000)
    return ()=>clearInterval(autoScroll)
 },[])
 useEffect(() => {
     scrollRef.current?.addEventListener("scroll", checkScroll);
     checkScroll()
     return () => scrollRef.current?.removeEventListener("scroll", checkScroll);
    
 },[])
  return (
    <motion.div
      className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-6 text-center">
        🛒 Shop by Category
      </h2>
      {showLeft && <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center transition-all" onClick={()=>scroll("left")}><ChevronLeft  className="w-6 h-6 text-amber-600"/></button>}
      <div className="flex gap-6 overflow-x-auto py-4 px-10 scrollbar-hide scroll-smooth" ref={scrollRef}>
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className={`min-w-[150px] md:min-w-[180px] flex flex-col items-center justify-center rounded-2xl ${cat.bgColor} shadow-md hover:shadow-xl transition-all cursor-pointer px-3 py-4`}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={cat.img.src}
                alt={cat.name}
                className="w-10 h-10 mb-3"
              />
              <span className="text-sm font-medium text-center break-word">
                {cat.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {showRight &&  <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"  onClick={()=>scroll("right")}><ChevronRight  className="w-6 h-6 text-amber-600"/></button>}

    </motion.div>
  );
}
