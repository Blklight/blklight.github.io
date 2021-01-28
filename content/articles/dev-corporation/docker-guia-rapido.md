---
title: Guia rápido - Docker Cli
description: Lista de comandos
img: https://assets.t3n.sc/news/wp-content/uploads/2015/06/docker-logo-2.jpg?auto=format&h=&ixlib=php-2.3.0&w=
imgAlt: ""
alt: my first blog post
channel: "dev-corporation"
category: "design"
isFeatured: false
headerLayout: "square-profile"
author:
  name: "Ultimate Mercer"
  bio: "Ultimate Awakening"
  avatar: https://i.imgur.com/diuV6oy.jpg
---

```javascript
//lista todos os containers
docker ps -a
export default {
  nuxt: 'is the best'
}
```

// lista todos os containers <br />
`> docker ps -a`

// força a remoção de um container (-f) e também de seus volumes (-v) <br />
`> docker rm -vf <container_id_or_name>`

// exibe os logs de um container <br />
`> docker logs -ft <container_id_or_name>`

// mata todos os containers que estam ativos <br />
`> docker kill $(docker ps -q)`

// remove todos os containers inativos <br />
`> docker rm $(docker ps -a -q)`

// permite o acesso as linhas de comando de container especifico <br />
`> docker exec -it <container_id_or_name> bash`

// remove todos os volumes não utilizados <br />
`> docker system prune -volumes`

// remove todas as imagens de uma única vez <br />
`> docker rmi -f $(docker images -q)`
