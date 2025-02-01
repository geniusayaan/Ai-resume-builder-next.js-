import { useEffect } from "react";

export default function useUnLoadWarning(condition:boolean){
    useEffect(()=>{

        if(!condition){
            return
        }

       const listener = (event:BeforeUnloadEvent)=>{
        event.preventDefault()
       }

       window.addEventListener("beforeunload", listener)

       return ()=>removeEventListener("beforeunload", listener)

    },[condition])
}