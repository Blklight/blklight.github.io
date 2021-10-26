---
title: "Svelte"
abstract: ""
imageHeader: "https://i.imgur.com/zEuLKvg.png"
cover:
createdDate: "2021-02-09 11:40"
updatedDate: ""
channel: "Dev Corporation"
category: ""
tags: ""
featured: false
type: "normal"
headerLayout: "portrait-left"
layout: ""
fontType: "base"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: "Bora estudar mais uma tecnologia pra estudar..."
---

Svelte é uma nova abordagem para o desenvolvimento de interfaces de usuário. Enquanto frameworks tradicionais, como Vue e React fazem grande parte de seu trabalho no navegador, o Svelte muda esse trabalho para a etapa de compilação que acontece quando você constrói o seu aplicativo.

Ao invés de utilizar técnicas para manipulação/alteração virtual do DOM, o Svelte escreve código que atualiza cirurgicamente o DOM quando o estado da sua aplicação muda.

```bash
npx degit sveltejs/template my-svelte-project
# ou download e extração
cd my-svelte-project
# para usar Typescript use:
# node scripts/setupTypeScript.js

npm install
npm run dev

```

#### O que é Svelte?

Svelte é uma ferramenta para construir aplicações web rápidas.

É semelhante a estruturas de JavaScript, como React e Vue, que compartilham o objetivo de facilitar a construção de interfaces de usuário interativas elegantes.

Mas há uma diferença crucial: Svelte converte seu aplicativo em JavaScript ideal no tempo de construção, em vez de interpretar o código do aplicativo em tempo de execução. Isso significa que você não paga o custo de desempenho das abstrações da estrutura e não incorre em penalidades quando seu aplicativo é carregado pela primeira vez.

Você pode construir seu aplicativo inteiro com Svelte ou pode adicioná-lo incrementalmente a uma base de código existente. Você também pode enviar componentes como pacotes independentes que funcionam em qualquer lugar, sem a sobrecarga de uma dependência de uma estrutura convencional.
