import { userAuthStore } from "@/store/Auth"
import { Session } from "inspector"
import { useRouter } from "next/router"
import React from "react"

const layout = ({children} : {children:React.ReactNode}) => {
    const {session} = userAuthStore()
    const router = useRouter()

    React.useEffect( ()=>{
        if(session){
            router.push("/")
        }
    },[session,router] )

    if(Session){
        return null;
    }

    return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12">
    <div className="relative">{children}</div>
    </div>
    )
}

export default layout