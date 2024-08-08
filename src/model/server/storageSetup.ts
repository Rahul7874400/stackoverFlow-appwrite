import {Permission} from "node-appwrite"
import { storage } from "./config"
import { questionAttachmentBucket } from "../name"


export default async function  getOrCreateBucket(){
    try {
        await storage.getBucket(questionAttachmentBucket)
        console.log("Connected bucket")
    } catch (error)
    {
        try {
            await storage.createBucket(questionAttachmentBucket,questionAttachmentBucket,[
                Permission.read('users'),
                Permission.read('any'),
                Permission.update('users'),
                Permission.delete('users'),
                Permission.create('users')
            ],
            false,
            undefined,
            undefined,
            ["jpg","png","jpeg"]
        )
    
        console.log("Buckect is created")
        } catch (error) {
            console.log("Error in creating the storage",error)
        }
    }
}