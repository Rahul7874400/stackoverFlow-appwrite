import {IndexType, Permission} from "node-appwrite"
import  {db,questionCollection} from "../name" 
import { database } from "./config"



export default async function createQuestionCollection(){
    // create collection
    await database.createCollection(db,questionCollection,questionCollection,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.create('users'),
        Permission.update('users'),
        Permission.delete('users')
    ])

    console.log("Question Collection is created");

    // create attribute
    await Promise.all([
        database.createStringAttribute(db,questionCollection,"title",100,true),
        database.createStringAttribute(db,questionCollection,"content",10000,true),
        database.createStringAttribute(db,questionCollection,"authorId",50,true),
        database.createStringAttribute(db,questionCollection,"taga",50,true,undefined,true),
        database.createStringAttribute(db,questionCollection,"attachmentId",50,false)
    ])

    console.log("Question Attribute is created")


    //create index
    await Promise.all([
        database.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        database.createIndex(
            db,
            questionCollection,
            "content",
            IndexType.Fulltext,
            ["content"],
            ["asc"]
        )
    ])
}