"use client"
import { userAuthStore } from "@/store/Auth";
import React from "react";

function login(){
    const {login} = userAuthStore()
    const [error,setError] = React.useState("")
    const [isLoading,setIsLoading] = React.useState(false)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            setError(() => "Please fill out all fields");
            return;
        }

        setIsLoading(() => true);
        setError(() => "");

        const loginResponse = await login(email?.toString(),password?.toString())

        if(loginResponse.error){
            setError( ()=>loginResponse.error!.message )
        }
        setIsLoading(false)
    }
    return (
        <div>
            LoginPage
        </div>
    )
}