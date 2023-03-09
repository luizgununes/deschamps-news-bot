const moment = require("moment-timezone");

let date = moment.tz("America/Sao_Paulo").format("DD/MM/YYYY");

var header = `*Filipe Deschamps Newsletter - ${date}*\n\n`;

var copyright =
  "*© Todos os direitos reservados. Filipe Deschamps.*\nPara receber essas notícias em seu e-mail gratuitamente, acesse: https://filipedeschamps.com.br/newsletter";

exports.getEmail = async function getEmail() {
  const { google } = require("googleapis");

  // Define as credenciais de API do Google.
  const credentials = {
    client_id: "<SEU CLIENT ID>",
    client_secret: "<SEU CLIENT SECRET>",
    redirect_uri: "https://localhost/oauth2callback",
    refresh_token: "<SEU REFRESH TOKEN>"
  };

  // Cria o cliente OAuth2 e autentica com as credenciais.
  const auth = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uri
  );
  auth.setCredentials({ refresh_token: credentials.refresh_token });

  // Cria o cliente do Gmail API.
  const gmail = google.gmail({ version: "v1", auth });

  return new Promise((resolve, reject) => {
    // Busca o e-mail na caixa de entrada.
    gmail.users.messages.list(
      {
        userId: "me",
        q: "from:newsletter@filipedeschamps.com.br",
        maxResults: 1,
      },
      (err, res) => {
        if (err) {
          return console.log(`Erro: ${err}`);
        }

        const message = res.data.messages[0];

        gmail.users.messages.get(
          { userId: "me", id: message.id },
          async (err, res) => {
            if (err) {
              return console.log(`Erro: ${err}`);
            }

            const email = res.data;

            let news = await decode(email.payload.parts[0].body.data);

            news = header + removeBreaks(news) + copyright;

            news = bold(news);

            // Pega todas as notícias e as separa em um array para facilitar o procedimento seguinte.
            arrayNews = news.split("\n\n");

            let numSplits = 0;

            // Remove as notícias que possuem links, normalmente propagandas (desculpa Filipe)!
            for (let x = 0; x <= arrayNews.length; x++) {
              if (arrayNews[x].includes("https://")) {
                arrayNews.splice(x - numSplits, 1);
                numSplits = numSplits + 1;
              }
            }

            // Une novamente as notícias no mesmo texto separadas por espaços.
            let joinedNews = arrayNews.join("\n\n");

            console.log(joinedNews);

            return resolve(joinedNews);
          }
        );
      }
    );
  });
};

// RegEx para deixar os títulos das notícias em negrito.
function bold(x) {
  return (x = x.replace(/^.*?:/gm, "*$&*"));
}

/* Calma, deixa eu explicar...
Esta função é, de fato, horrível.
Eu a encontrei em um site que remove as quebras de linhas de um texto sem tirar todos os espaços.
Parece algo simples (e talvez seja mesmo), mas que ao tentar fazer das formas convencionais, não deu certo.
Ela é necessária porque a API do Gmail retorna o texto formatado da mesma forma que aparece no navegador.
E no navegador, as notícias ficam ao meio, usando quebras de linhas para ficar centralizadas.
Sem esta função, a leitura no WhatsApp era péssima.
*/
function removeBreaks(x) {
  x = x.replace(/(\r\n|\n|\r)/gm, "<1br />");

  re1 = /<1br \/><1br \/>/gi;
  re1a = /<1br \/><1br \/><1br \/>/gi;

  x = x.replace(re1a, "<1br /><2br />");
  x = x.replace(re1, "<2br />");

  re2 = /\<1br \/>/gi;
  x = x.replace(re2, " ");

  re3 = /\s+/g;
  x = x.replace(re3, " ");

  re4 = /<2br \/>/gi;

  x = x.replace(re4, "\n\n");

  return x;
}

// Converte o e-mail de Base64 para texto e corrige a codificação dos caracteres.
function decode(x) {
  return decodeURIComponent(
    atob(x.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  ).split("\nCancelar inscrição")[0];
}
