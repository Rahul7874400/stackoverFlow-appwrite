import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException,ID,Models } from "appwrite";
import { account } from "@/model/client/config";


export interface userPrefs {
    reputation : number
}


// creating the interface

interface IAuthStore {
    session : Models.Session | null
    jwt : string | null
    user : Models.User<userPrefs> | null
    hydrated : boolean


    setHydrated(): void
    verifySession(): Promise<void>
    login(
        email : string,
        password : string
    ):Promise<{success : boolean , error?:AppwriteException | null;
    }>
    CreateAccount(
        name : string,
        email : string,
        password : string
    ):Promise<{success : boolean , error?:AppwriteException | null;
    }>

    logout():Promise<void>
}

export const userAuthStore = create<IAuthStore>()(
persist(

    immer( (set)=>({
        session : null,
        jwt : null,
        user : null,
        hydrated : false,

        setHydrated() {
            set({hydrated : true})
        },

        async verifySession() {
            try {
                const session = await account.getSession("current")
                set({session : session})
            } catch (error) {
                console.log(error)
            }
        },

        async login(email, password) {
            try {
                const session = await account.createEmailPasswordSession(email,password)
                const [user,{jwt}] = await Promise.all([
                    account.get<userPrefs>(),
                    account.createJWT()
                ])

                if(user.prefs?.reputation){
                    await account.updatePrefs<userPrefs>({reputation : 0})
                }

                set({session,user,jwt})

                return {success : true}
            } catch (error) {
                console.log(error)

                return {
                    success : false,
                    error : error instanceof AppwriteException ? error : null
                }
            }
        },

        async CreateAccount(name, email, password) {
            try {
                await account.create(ID.unique(),email,password,name)


                return { success : true }
            } catch (error) {
                console.log(error)

                return {
                    success : false,
                    error : error instanceof AppwriteException ? error : null
                }
            }
        },
        async logout() {
            try {
                await account.deleteSessions()
                set({session : null,jwt : null , user : null})
            } catch (error) {
                console.log(error)
            }
        },
    }) ),

    {
        name : "auth",
        onRehydrateStorage(){
            return (state : any,error : any)=>{
                if(!error){
                    state?.hydrated
                }
            }
        }
    }
)
)