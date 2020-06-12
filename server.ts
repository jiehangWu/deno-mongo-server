import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import { fetchMessageById, fetchAllMessages, createMessage } from './controller.ts';

const HOST = Deno.env.get("HOST") || '127.0.0.1';
const PORT = 5000;

const app = new Application();
app.get('/messages', fetchAllMessages)
      .get('/messages/:id', fetchMessageById)
      .post('/messages', createMessage)
      .start({ hostname: `${HOST}`, port: PORT });

console.log(`Listening on port ${PORT}`);
