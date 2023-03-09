FROM ubuntu
COPY . .
RUN ls
RUN apt update
RUN apt install -y openssh-client
RUN chmod 0400 ssh.key
RUN ssh ubuntu@<IP DA MÁQUINA> -o "StrictHostKeyChecking no" -i ssh.key 'bash -l -c "source /home/ubuntu/.nvm/nvm.sh;cd deschamps-news-bot; git add .; git stash; git pull; rm -rf node_modules; npm install; npm i whatsapp-web.js; pm2 restart deschamps-news-bot"'
