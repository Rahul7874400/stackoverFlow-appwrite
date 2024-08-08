import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { database } from "./config";

export default async function getOrCreateDB(){
    try {
        await database.get(db)
        console.log("Database is Already connected")
    } catch (error) {
        try {
            // create the database
            await database.create(db,db)
            // create the collection
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection()
            ])

            console.log("Collection is created")
            console.log("Database is created")

        } catch (error) {
            console.log("Error is connecting the database",error)
        }
    }

    return database
}