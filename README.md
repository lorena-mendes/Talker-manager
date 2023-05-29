# Projeto Talker Manager
Projeto realizado durante o curso de desenvolvimento web da Trybe.

## O que foi desenvolvido
Este projeto consiste em desenvolver uma aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações. Foi desenvolvida uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e alguns endpoints responsáveis por ler e escrever em um arquivo utilizando o módulo fs.

## Tecnologias utilizadas
* Node.js
* Express
* Docker

## Pré-requisitos
Antes de começar a desenvolver e rodar a aplicação, certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:
* Node.js: se não tiver o node instalado, você pode baixar a versão mais recente no site oficial (https://nodejs.org) e seguir as instruções de instalação apropriadas para o seu sistema operacional.
* Docker: O Docker é uma plataforma de virtualização leve que permite empacotar e distribuir aplicações em contêineres. Certifique-se de ter o Docker instalado em sua máquina. Você pode fazer o download do Docker em seu site oficial (https://www.docker.com/get-started) e seguir as instruções de instalação adequadas para o seu sistema operacional.

## Como rodar a aplicação
* Após clonar o repositório, rode o serviço `node` com o comando `docker-compose up -d`. Esse serviço irá inicializar um container chamado `talker_manager`. A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
* Use o comando `docker exec -it talker_manager bash`. Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
* Instale as dependências com o `npm install` e execute a aplicação com o `npm start` ou `npm run dev`.


## Desenvolvedor 
Lorena Mendes - https://github.com/lorena-mendes
