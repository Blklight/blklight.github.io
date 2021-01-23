---
title: "Javascript assíncrono utilizando Async - Await"
abstract: ""
imageHeader: "https://i.imgur.com/MHHLm6d.png"
cover: "https://i.imgur.com/MHHLm6d.png"
channel: "dev-corporation"
category: "code"
tags:
featured: false
type: "normal"
headerLayout: "landscape"
fontType: ""
author:
  name: "Ultimate Mercer"
  bio: "Ultimate Awakening"
  avatar: https://i.imgur.com/diuV6oy.jpg
---

## _**Async functions**_

`Async/await` é relativamente uma nova maneira para se escrever código assíncrono em Javascript. Antes nós utilizávamos `callbacks` e `promises`. `Async/await` na verdade se baseia em `promises`. Se você ainda não havia utilizado `promises`, este é um bom momento para você aprender sobre.

_Async/await is a relatively new way to write asynchronous code in Javascript. Before we used callbacks and promises. Async/await actually builds on top of promises. If you have not used promises before, this is a good point to go brush up on them, find link to a useful article here._

Por que `async/await`? Bem, simplesmente porque, `async/await` nos permite escrever código assíncrono de maneira síncrona.

_Why async/await? Well, simply put, async/await allows us to write asynchronous code in a synchronous manner._

Para criar uma função `async`, tudo o que precisamos fazer é adicionar a palavra-chave `async` antes da definição da função, deste jeito:

_To create an async function all we need to do is add the async keyword before the function definition, like this:_

```js
async function asyncFunc() {
  return "Hey!";
}
```

Algo que você precisa saber sobre funções `async` é que elas sempre retornam `promises`.

_The one thing you need to know about async functions is that; they always returns a promise._

No caso onde nós explicitamente returnamos algo que não é uma `promise`, como acima, o valor retornado é automáticamente incluído em uma `promise` resolvida, sendo o valor resolvido sendo uma `_non-promise_`. Para o código acima, `asyncFunc().then(result => console.log(result))`, irá retorna a string Hey!.

_In the case where we explicitly return something that is not a promise, like above, the return value is automatically wrapped into a resolved promise with the resolved value being the non-promise. For the code above, `asyncFunc().then(result => console.log(result))` will return the string Hey!._

## **_Await_**

A palavra-chave `await` só pode ser utilizada junto de um bloco `async`, caso contrário, irá gerar um erro de sintaxe. Isso significa que você não pode utilizar o `await` no nível superior do código, basicamente pode ser utilizado sozinho.

_The await keyword can only be used within an async block, otherwise it'll throw a syntax error. This means you cannot use await in the top level of our code, basically, don't use it by itself._

**Quando nós devemos utilizá-lo?** Se nós possuirmos uma função assíncrona dentro de bloco `async`. Então, vamos dizer que precisamos buscar alguns dados do nosso servidor e depois utilizar esses dados dentro do nosso bloco `async`. Nós utilizaremos o `await` para parar a execução da função e continuar depois que os dados forem obtidos. Por exemplo:

_When do we use it? If we have an asynchronous function inside of an async block. So let's say we need to fetch some data from our server and then use that data within our async block. We will use await to pause the function execution and resume after the data comes in. For example:_

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const data = await axios.get("/some_url_endpoint");
  return data;
}
```

**Por que utilizar o `await`?** Ao invés de usar o `await`, nós poderiamos ter usado apenas uma `promise` certo?

_**Why use await?** Instead of using await we could have just used a promise right?_

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

_Await is simply a more elegant way to write a promise within an async function. It improves readability immensely and hence the reason we use it._

Let's assume we have a couple of asynchronous functions within our async block. Instead of chaining promises we could do this, which is much cleaner:

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const response = await axios.get("/some_url_endpoint");
  const data = await response.json();

  return data;
}
```

## _**Error handling**_

How do we handle errors? We have a few options, let's explore them:

#### **Try..catch**

This is the most common way to handle errors when using async-await, good old try-catch. All you need to do is encapsulate your code in a try block and handle any errors that occur in a catch.

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

If an error occurs when fetching data from our endpoint, execution is transferred to the catch block and we can handle whatever error is thrown. If we have multiple await lines the catch block catches the errors that occur in all the lines.

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

We can alternatively append `.catch()` on the promise generated by the async function. Let's recap: Remember that the async function returns a promise. If an error occurs then it returns a rejected promise.So on the function call we could do this:

```js
asyncFunc().catch((error) => {
  // handle error appropriately
});
```

## _**Fun facts**_

#### **Async on class methods**

Class methods can be async.

```js
class Example {
  async asyncMethod() {
    const data = await axios.get("/some_url_endpoint");
    return data;
  }
}
```

To call the method we'd do:

```js
const exampleClass = new Example();
  exampleClass.asyncMethod().then(//do whatever you want with the result)
```

#### **Await is thenable**

We can append a `.then()` on an await.

```js
async function asyncFunc() {
  // fetch data from a url endpoint
  const data = await axios.get("/some_url_endpoint")
    .then((result) => return result.names)

  return data;
}
```

#### **Await <> Promise.all**

If we have multiple promises we could use `Promise.all` with await.

```js
async function asyncFunc() {
  const response = await Promise.all([
    axios.get("/some_url_endpoint"),
    axios.get("/some_url_endpoint")
  ]);
  ...
}
```

## _**Conclusion**_

In summary, async/await is a cleaner syntax to write asynchronous Javascript code. It enhances readability and flow of your code.

Things to keep in mind while using async/await:

Async functions return a promise.
Await can only be used inside an async block.
Await waits until the function("promise") resolves or rejects.
Its quite easy to learn and use. Enjoy experimenting!!

Like this article? [Follow @joykare on Twitter](https://twitter.com/joykare_)

Article published originally on [Scotch.io](https://scotch.io/tutorials/asynchronous-javascript-using-async-await) and writed for [@joycare](https://twitter.com/joykare_).
