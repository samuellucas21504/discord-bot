# BOT DE AÇÕES DO DISCORD

Esse é um bot do discord que busca a cotação de ações que o usuário registra todos os dias de semana às 18h.

## COMO EXECUTAR

1. Baixe e instale o [docker](https://www.docker.com/) em sua máquina.
2. Clone o projeto com `git clone git@github.com:samuellucas21504/discord-bot.git`
3. Crie um arquivo baseado em `.env.example` chamado `.env` com as configurações do seu bot.
4. Execute `docker compose up`
  - Caso seja sua primeira vez executando o bot, você deverá executar o seguinte comando no container do banco de dados:
  ```
    CREATE DATABASE IF NOT EXISTS discord_bot;
    
    CREATE USER IF NOT EXISTS 'botuser'@'%' IDENTIFIED BY 'botpassword';
    
    GRANT ALL PRIVILEGES ON discord_bot.* TO 'botuser'@'%';
    
    FLUSH PRIVILEGES;
  ```
  - Após executar isso, execute novamente `docker compose up`

# COMANDOS

O bot atualmente conta com 4 comandos. Esses são:

/stocks
  - add (Adiciona uma ação na lista de notificações)
  - remove (Remove uma ação da lista de notificações)
  - subscribe (Inscreve o usuário em uma lista de notificações)
  - unsubscribe (Remove o usuário da lista de notificações)

# DISCLAIMERS

Esse bot consome a API da [brapi](https://brapi.dev/), então caso você deseje usar outra API, alterações em endpoints e lógica de serviço talvez sejam necessárias.
