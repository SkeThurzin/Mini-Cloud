import Client from "./controllers/CloudLauncher.js";

import dotenv from "dotenv";
dotenv.config();

import options from "./public/plugins/Intents.js";
const client = new Client(options);

client.login(process.env.TOKEN);
