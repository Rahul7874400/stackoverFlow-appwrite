import {Permission,IndexType} from "node-appwrite"
import {db,answerCollection} from "../name"
import { database } from "./config"



export default async function createAnswerCollection(){
    // create collection

    await database.createCollection(db,answerCollection,answerCollection,[
        Permission.read('any'),
        Permission.read('Users'),
        Permission.update('users'),
        Permission.delete('users'),
        Permission.create('users')
    ])

    console.log("Answer Collection is created");

    await Promise.all([
        database.createStringAttribute(db,answerCollection,"content",1000,true),
        database.createStringAttribute(db,answerCollection,"questionId",50,true),
        database.createStringAttribute(db,answerCollection,"authorId",1000,true)
    ])

    console.log("Answer attribute is created");
}