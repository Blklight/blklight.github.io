---
title: "Docker - Lista de comandos"
description: ""
imageHeader: "https://i.imgur.com/GF3Gh2r.jpg"
cover: ""
createdDate: "2022-11-24 19:45"
updatedDate: ""
channel: "Dev Corporation"
category: "Team Blklight"
tags:
  - "Ideia"
  - "Projetos"
featured: false
type: "normal"
headerLayout: "fullpage"
layout: "two-column"
filter: "filter-cyberpunk-ix"
fontType: "mono"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: "Listinha com comandos para ajudar!!"
cardComponent: "CardHorizontal"
---

## Lista de comandos

## Async functions

**Download imagem:**
`docker pull image`

```bash
docker pull postgres //Ultima versão disponível

docker pull postgres:15.1 //Versão específica
```

**Listar imagens:**
`docker image ls`

**Executar uma imagem:**
`docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

```bash
docker run --name [DATABASE NAME] -e POSTGRES_USER=[USER] -e POSTGRES_PASSWORD=[PASSWORD] -p 5432:5432 -d postgres

//exemplo
docker run --name pg-database -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

> #### Informações adicionais:
>
> `-e` -> variaveis de ambiente
>
> `-d` -> roda em background

**Container rodando:**

```bash
docker container ls === docker ps
```
