import axios from 'axios'

async function emitEventHandler(event:string,data:unknown,socketId?:string) {
  try{
    const socketServerUrl = process.env.NEXT_SOCKET_SERVER
    if (!socketServerUrl) {
      throw new Error("NEXT_SOCKET_SERVER is not configured")
    }
    await axios.post(`${socketServerUrl}/notify`,{socketId,event,data})
  }catch(error){
    console.log(error)
  }
}

export default emitEventHandler
