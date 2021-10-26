---
title: "Javascript assíncrono utilizando Async - Await"
abstract: ""
imageHeader: "https://i.imgur.com/MHHLm6d.png"
cover: "https://i.imgur.com/MHHLm6d.png"
createdDate: "2021-01-25 14:30"
updatedDate: ""
channel: "Dev Corporation"
category: "code"
tags:
featured: false
type: "normal"
headerLayout: "basic"
layout: ""
fontType: "base"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: ""
---

## _**Async functions**_

`Async/await` é relativamente uma nova maneira para se escrever código assíncrono em Javascript. Antes nós utilizávamos `callbacks` e `promises`. `Async/await` na verdade se baseia em `promises`. Se você ainda não havia utilizado `promises`, este é um bom momento para você aprender sobre.

Por que `async/await`? Bem, simplesmente porque, `async/await` nos permite escrever código assíncrono de maneira síncrona.

Para criar uma função `async`, tudo o que precisamos fazer é adicionar a palavra-chave `async` antes da definição da função, deste jeito:

```js
async function asyncFunc() {
  return "Hey!";
}
```

Algo que você precisa saber sobre funções `async` é que elas sempre retornam `promises`.

No caso onde nós explicitamente returnamos algo que não é uma `promise`, como acima, o valor retornado é automáticamente incluído em uma `promise` resolvida, sendo o valor resolvido sendo uma _`non-promise`_. Para o código acima, `asyncFunc().then(result => console.log(result))`, irá retorna a string Hey!.

## **_Await_**

A palavra-chave `await` só pode ser utilizada junto de um bloco `async`, caso contrário, irá gerar um erro de sintaxe. Isso significa que você não pode utilizar o `await` no nível superior do código, basicamente pode ser utilizado sozinho.

**Quando nós devemos utilizá-lo?** Se nós possuirmos uma função assíncrona dentro de bloco `async`. Então, vamos dizer que precisamos buscar alguns dados do nosso servidor e depois utilizar esses dados dentro do nosso bloco `async`. Nós utilizaremos o `await` para parar a execução da função e continuar depois que os dados forem obtidos. Por exemplo:

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const data = await axios.get("/some_url_endpoint");
  return data;
}
```

**Por que utilizar o `await`?** Ao invés de usar o `await`, nós poderiamos ter usado apenas uma `promise` certo?

```js
async function asyncFunc() {
  let data;
  // fetch data from a url endpoint
  axios.get("/some_url_endpoint").then((result) => {
    data = result;
  });
  return data;
}
```

`Await` é simplesmente uma maneira mais elegante de se escrever uma `promise` dentro de uma função assincrona. Melhorando imensamente a legibilidade, portanto, sendo o motivo para a utilizarmos.

Vamos assumir que nós tem algumas funções assíncronas dentro do nosso bloco `async`. Ao invés de encadear `promises`, nós poderiamos fazer isto, que é muito mais limpo:

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const response = await axios.get("/some_url_endpoint");
  const data = await response.json();

  return data;
}
```

## _**Error handling**_

Como nós podemos lidar com erros? Nós temos algumas opções, vamos explorar elas:

#### **Try...catch**

Está é a maneira mais comum de se lidar com erros quando se utiliza `async-await`, o bom e velho `try-catch`. Tudo o que você precisar fazer é encapsular o seu código em um bloco `try` e lidar com qualquer erro que possa ocorrer no `catch`.

```js
async function asyncFunc() {
  try {
    // fetch data from a url endpoint
    const data = await axios.get("/some_url_endpoint");
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
```

Se um erro ocorrer quando os dados forem buscados do nosso _endpoint_, a execução é transferida para o bloco `catch` e nós podemos lidar com qualquer que seja o erro lançado. Se nós tivermos múltiplas linhas com `await`, o bloco `catch` pegará os erros que ocorrerem em todas as linhas.

```js
async function asyncFunc() {
  try {
    // fetch data from a url endpoint
    const response = await axios.get("/some_url_endpoint");
    const data = await response.json();

    return data;
  } catch (error) {
    alert(error); // catches both errors
  }
}
```

#### **If not try..catch**

Nós podemos alternativamente acrescentar `.catch()` na `promise` gerada pela função assíncrona. Recapitulando: Lembre-se que a função assíncrona(`async`) retorna uma `promise`. Se um erro ocorrer ele retornará uma `promise` rejeitada. Então nós podemos fazer isto na chamada da função:

```js
asyncFunc().catch((error) => {
  // handle error appropriately
});
```

## _**Fun facts**_

#### **Async on class methods**

Métodos de classes podem ser assíncronos.

```js
class Example {
  async asyncMethod() {
    const data = await axios.get("/some_url_endpoint");
    return data;
  }
}
```

Para chamar o método, nós faríamos:

```js
const exampleClass = new Example();
  exampleClass.asyncMethod()
	.then(//do whatever you want with the result)
```

#### **Await is thenable**

Nós podemos acrescentar um `.then()` em um `await`.

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const data = await axios.get("/some_url_endpoint")
    .then((result) => return result.names)

  return data;
}
```

#### **Await <> Promise.all**

Se nós tivermos múltiplas `promises`, nós podemos usar `Promise.all` com `await`.

```js
async function asyncFunc() {
  const response = await Promise.all([
    axios.get("/some_url_endpoint"),
    axios.get("/some_url_endpoint")
  ]);
  ...
}
```

## _**Conclusão**_

Em síntese, `async/await` é uma sintaxe limpa para se escrever código Javascript assíncrono. Aprimorando sua legibilidade e o fluxo do seu código.

Tenha em mente enquanto utilizar `async/await`:

- _Funções assíncronas retornan uma `promise`._
- _`Await` só pode ser usado dentro de um bloco `async`._
- _`Await` aguarda até que a função(`promise`) seja resolvida ou rejeitada._
- _É de fácil aprendizado e utilização. Divirta-se experimentando!_

Gostou deste artigo? [Siga @joykare no Twitter](https://twitter.com/joykare_).

Artigo publicado originalmente em [Scotch.io](https://scotch.io/tutorials/asynchronous-javascript-using-async-await) e escrito por [@joycare](https://twitter.com/joykare_).
