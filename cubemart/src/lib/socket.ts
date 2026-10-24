import { io, Socket } from "socket.io-client";

let socket:Socket|null=null;
let socketServerUrl:string|null=null;

export const configureSocketServer = (url:string) => {
    if (!url) {
        throw new Error("NEXT_SOCKET_SERVER is not configured");
    }

    socketServerUrl=url;
};

export const getSocket=()=>{
if(!socket){
    if (!socketServerUrl) {
        throw new Error("Socket server URL has not been configured");
    }
    socket=io(socketServerUrl)
}
return socket;
}