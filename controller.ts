import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import db from './db.ts';

const database = db.getDatabase;
const messages = database.collection('messages');
// Scheme
interface Message {
    _id: {
        $oid: string;
    };
    content: string;
    detail: string;
}

export const createMessage: HandlerFunc = async(c: Context) => {
    const body: Message = await(c.body());
    
    const { content, detail } = body;

    const insertedMessage = await messages.insertOne({
        content,
        detail
    });

    // 201 created
    return c.json(insertedMessage, 201);
}

export const fetchAllMessages: HandlerFunc = async(c: Context) => {
    const fetchedMessages: Message[] = await messages.find();

    const list = fetchedMessages.length
        ? fetchedMessages.map((message) => {
            return message;
        })
        : [];

    return c.json(list, 200);
}

export const fetchMessageById: HandlerFunc = async(c: Context) => {
    const { id } = c.params as { id: string };
    const fetchedMessage = await messages.findOne({_id: { "$oid": id } });

    return c.json(fetchedMessage, 200);
}