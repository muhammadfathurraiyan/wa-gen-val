import { Client, LocalAuth } from "whatsapp-web.js";

export async function POST(request: Request) {
  const number = await request.json();
  const allSessionObject = {};

  const client = new Client({
    puppeteer: {
      headless: false,
    },
    authStrategy: new LocalAuth({
      clientId: "MyId",
    }),
  });

  client.on("ready", async () => {
    console.log("Client is ready!");
    const numberExists = await client.isRegisteredUser(`+${number}`);
    console.log(numberExists);
    return Response.json({ numberExists });
  });

  client.initialize();
}
