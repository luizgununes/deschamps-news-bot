# Deschamps News BOT
BOT que busca, formata e envia a newsletter do Filipe no WhatsApp.

## Motivo do Projeto
Calma lá, eu sei o que você está pensando. Além do [Filipe](https://github.com/filipedeschamps) nos fazer esse grande favor de compilar as principais notícias de tecnologia e enviar em nosso e-mail de graça (clique [aqui](https://filipedeschamps.com.br/newsletter) para se inscrever), eu ainda quis mais. A verdade é que eu evito de ficar constantemente acessar a minha caixa de e-mail, já o WhatsApp, eu consulto com uma maior frequência, e por conta disso, a probabilidade de eu ler as notícias é maior.

E ah, eu não pretendo liberar o número do meu BOT para que vocês possam se cadastrar e receber a newsletter sem precisar clonar o projeto pois ele possui outros comandos relacionados a grupos específicos. Quem sabe no futuro eu compre um número apenas para esta finalidade.

## Melhorias
Este projeto definitivamente pode ser MUITO melhorado e refatorado. Optei por lançá-lo desta maneira pois já cumpre seu propósito, e acredito que a evolução de um projeto deve ser registrada pelo GitHub. Conto com a ajuda de vocês!

## Instalação
Para utilizar o BOT, basta rodar o comando `npm install` na raíz do projeto e em seguida `node index.js` para iniciá-lo.

Um QR Code aparecerá no console da aplicação, o qual deverá ser escaneado pelo aparelho que será o BOT. Este procedimento só precisará ser feito uma única vez.

Para o pleno funcionamento da aplicação, é necessário fazer pequenas alterações no arquivo `index.js`, `email.js` e no `Dockerfile` (caso deseje rodar o BOT em uma outra máquina).

### Index.js
Neste arquivo, é necessário alterar para qual grupo ou contato a newsletter será diariamente enviada.

O formato padrão compreendido pela API para contatos é: 554299999999@c.us e 554299999999-99999999@g.us para grupos.

No caso dos contatos, basta concatenar o `código do país + DDD + número da pessoa`.

Já no caso dos grupos, é o `código do país + DDD + número da pessoa que criou o grupo + id do grupo`.

Na dúvida, recomendo que debuguem o código adicionando um breakpoint em uma linha em que possam ler a variável `message`, pois, nela contém todas as informações sobre a mensagem, incluindo quem a enviou, em que grupo enviou (caso seja o caso) e para quem enviou.

Você pode também alterar o horário na qual a newsletter será enviada, desde que seja posterior às 11:05, horário que costuma chegar a newsletter no e-mail (pelo menos para mim).

O código NÃO fica verificando constantemente se chegou e-mail novo, ele faz apenas uma verificação por dia na hora determinada. Ou seja, caso a newsletter atrase, será lida apenas no dia seguinte.

### Email.js
Neste arquivo, você precisará inserir o seu `client_id`, `client_secret` e seu `refresh_token` do Google.

Para obter estes dados, você pode seguir este [tutorial](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid).

### Dockerfile
Neste arquivo, estou lendo a chave SSH da máquina virtual (no meu caso) na mesma pasta que o projeto se encontra, o que NÃO É uma boa prática. Fiz desta maneira para facilitar os testes apenas. Repare também que é necessário substituir o IP da sua máquina no arquivo bem como  o nome da pasta do projeto.

## Atenção
Não recomendo que utilizem o número de celular pessoal ou profissional de vocês. Comprem um chip apenas para esta finalidade.

Nenhum número meu foi banido neste projeto ou em projetos anteriores utilizando BOT's, entretanto, todo cuidado é pouco.

## Disclaimer
As notícias enviadas pelo BOT e o projeto em si da newsletter é de total autoria do [Filipe Deschamps](https://github.com/filipedeschamps).