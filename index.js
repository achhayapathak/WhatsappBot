const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

// Number where you want to send the message.
const number = "+918295380050";
// Getting chatId from the number.
const chatId = number.substring(1) + "@c.us";

client.on('qr', (qr) => {
  // Generate and display the QR code for authentication
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');

     // Your message.
    const text = "Hi from WhatsApp Bot";
   
    // Sending message.
    client.sendMessage(chatId, text);
   });

client.on('message', (message) => {
    // Revert back messages if it is not a status message
    if(message.from != "status@broadcast") {
        console.log(`Received message from ${message.from}: ${message.body}`);

        // Return Message back the client
        const text = "Your message was: " + message.body;
        client.sendMessage(message.from, text);
    }
});

client.initialize();
