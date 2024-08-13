"use client"

import { userAuthStore } from "@/store/Auth";
import React from "react";

function RegisterPage(){
    const {createAccount , login} = userAuthStore()
    const [isLoding,setIsLoading] = React.useState(false)
    const [error,setError] = React.useState("")
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!firstname || !lastname || !email || !password) {
            setError(() => "Please fill out all fields");
            return;
        }

        setIsLoading(() => true);
        setError(() => "");

        const response = await createAccount(
            `${firstname} ${lastname}`,
            email.toString(),
            password.toString()
        );

        if(response.error){
            setError(()=> response.error!.message)
        }
        else{
            const loginResponse = await login(email?.toString(),password?.toString())

            if(loginResponse.error){
                setError( ()=> loginResponse.error!.message )
            }
        }
        setIsLoading(()=>false)
    }
    return (
        <div>
            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>


            </form>

        </div>
    )
}

export default RegisterPage