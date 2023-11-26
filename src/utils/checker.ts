import { Client, LocalAuth } from "whatsapp-web.js";

export default async function checkNumber(phoneNumber: any) {
  const allSessionObject = {};
  const body = phoneNumber.json();

  console.log(body);

  const client = new Client({
    puppeteer: {
      headless: false,
    },
    authStrategy: new LocalAuth({
      clientId: "MyId",
    }),
  });

  let numberExists = false;

  var validNumber = await client.isRegisteredUser(body);

  if (validNumber) {
    numberExists = true;
    console.log("nomor ini valid ", validNumber);
  } else {
    console.log(body, "nomor ini tidak valid");
  }

  client.initialize();

  return numberExists;
}
