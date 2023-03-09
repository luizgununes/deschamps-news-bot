const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const moment = require("moment-timezone");
const email = require("./email");
// Define o prefixo dos comandos do BOT, sinta-se à vontade para alterar.
const prefix = "!";

// Recomendo não alterar.
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "./sessions" }),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// Gera o QR Code no console da aplicação.
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Alerta no console que o BOT está online.
client.on("ready", () => {
  console.log("Deschamps News BOT está online!");
});

client.initialize();

client.on("message", async (message) => {
  // Comportamento do comando !ajuda.
  if (message.body == prefix + "ajuda") {
    client.sendMessage(message.from, "Utilize o comando *!news* para ler as notícias do dia.");
  // Comportamento do comando !news.
  } else if (message.body == prefix + "news") {
    client.sendMessage(message.from, await email.getEmail());
  }
});

// Rotina de envio da newsletter
setInterval(async () => {
  let date = moment.tz("America/Sao_Paulo");
  let hora = date.format("H");
  let minutos = date.format("mm");
  let segundos = date.format("ss");

  if (hora == 11 && minutos == 10 && segundos == 0) {
    client.sendMessage("<Número do Grupo@g.us>", await email.getEmail());
    // client.sendMessage("<Número do Contato@c.us>", await email.getEmail());
  }
}, 1000);
