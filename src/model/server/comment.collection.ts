import {Permission} from "node-appwrite"
import {db,commentCollection} from "../name"
import { database } from "./config"


export default async function createCommentCollection(){
    // create collection

    await database.createCollection(db,commentCollection,commentCollection,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.update('users'),
        Permission.create('users'),
        Permission.delete('users')
    ])

    console.log('Comment collection is created');

    await Promise.all([
        database.createStringAttribute(db,commentCollection,"content",1000,true),
        database.createEnumAttribute(db,commentCollection,"type",["answer","question"],true),
        database.createStringAttribute(db,commentCollection,"typeId",50,true),
        database.createStringAttribute(db,commentCollection,"authorId",50,true),
    ])
}