import {Permission} from "node-appwrite"
import {database} from "./config"
import { db,voteCollection } from "../name"

export default async function createVoteCollection(){
    //create the collection
    await database.createCollection(db,voteCollection,voteCollection,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.create('users'),
        Permission.update('users'),
        Permission.delete('users')
    ])

    console.log("vote collection is created")

    // create the attribute
    await Promise.all([
        database.createEnumAttribute(db,voteCollection,"type",['Question','Answer'],true),
        database.createStringAttribute(db,voteCollection,"typeId",50,true),
        database.createEnumAttribute(db,voteCollection,"voteStatus",['upvote','downvote'],true),
        database.createStringAttribute(db,voteCollection,"voteId",50,true)
    ])

    console.log("Attribute is created ")
}