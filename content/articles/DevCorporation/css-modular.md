---
title: "CSS Modular"
abstract: ""
imageHeader: "https://i.imgur.com/OiUQA4B.png"
cover: ""
createdDate: "2021-02-18 16:55"
updatedDate: ""
channel: "Dev Corporation"
category: "code"
tags:
featured: false
type: "normal"
headerLayout: "parallax"
layout: ""
fontType: "base"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: ""
---

## **O que é CSS Modular?**

CSS Modular é uma coleção de princípios para escrever código com desempenho e manutenção em escala. Foi originado através de desenvolvedores do Yahoo e Yandex, como uma maneira de enfrentar os desafios para manter uma grande base de código. Algumas das instruções são controversas quando introduzidas, mas desde então vieram a ser reconhecidas como as melhores práticas.

## **Metodologias**

Existem inúmeras metodologias para CSS Modular, e agora iremos apresentar com uma breve descrição e exemplo.

### OOCSS

CSS orientado a objetos (OOCSS) foi criado por Nicole Sullivan. OOCSS segue bem próximo o conceito da programação orientada a objetos de responsabilidade unica e separação de interesses. A idéia é criar objetos ou componentes flexíveis, reutilizáveis, escaláveis, independente e de fácil gerenciamento. Basicamente, objetos são padrões reutilizáveis onde a aparência visual não é determinada pelo contexto.

_**Existem dois principais princípios do OOCSS.**_

#### 1. Separar a estrutura e estilização

A estrutura se refere as propriedades de um objeto, que determina como um objeto é colocado em um lugar particular da página, tal como altura, _margins_, _overflow_, _paddings_, e largura. Enquanto que as estilização do objeto se refere obviamente as propriedades visuais tal como cores, degrades, tipografia e sombras.

**Exemplo:**

CSS com regras normais:

```css
.btn {
  width: 150px;
  height: 50px;
  background: #fff;
  border-radius: 5px;
}

.btn-2 {
  width: 150px;
  height: 50px;
  background: #000;
  border-radius: 5px;
}
```

Aplicando OOCSS ao CSS acima:

```css
.btn {
  background: #fff;
}

.btn-2 {
  background: #000;
}

.link {
  width: 150px;
  height: 50px;
  border-radius: 5px;
}
```

```html
<a class="btn link" href="#">Home</a>

<a class="btn-2 link" href="#">Blog</a>
```

#### 2. Separar o container do conteúdo

Neste contexto, conteúdo refere-se aos elementos tal como _div_, imagens, _span_, e tags de paragráfos que são aninhados juntos com outros elementos, que são referenciados como containeres.

**Exemplo:**

CSS com regras normais:

```css
navbar {
  padding: 2px;
  left: 0;
  margin: 3px;
  position: absolute;
  width: 140px;
}

#navbar .list {
  margin: 3px;
}

#navbar .list .list-header {
  font-size: 16px;
  color: red;
}

#navbar .list .list-content {
  font-size: 12px;
  color: #fff;
  background-color: red;
}
```

Aplicando OOCSS ao CSS acima:

```css
.navbar {
  padding: 2px;
  left: 0;
  margin: 3px;
  position: absolute;
  width: 140px;
}

.list {
  margin: 3px;
}

.list-header {
  font-size: 16px;
  color: red;
}

.list-content {
  background-color: red;
  color: #c3dacf;
  font-size: 12px;
}
```

### BEM

BEM foi criado pelo time da Yandex. BEM significa Bloco(_Block_), Elementos(_Elements_), e Modificadores(_Modifiers_). Seu objetivo é escrever um independente, reutilizável, legível, e código limpo depende muito de sua abordagem de convenção de nomenclatura. A sua convenção de nomenclatura é baseada em:

O componente Bloco (nível superior) na página que contém elementos como filho, e o elemento é denotado na convenção de nomenclatura como filho do bloco e pode ser representado pelo nome do bloco seguido por sublinhado(\_) e o nome do elemento e a última parte da convenção de nomenclatura BEM é um modificador que pode manipula a aparência de um bloco e é precedido na convenção de nomenclatura pelo nome do bloco / elemento, dois hifens(--) e o nome do modificador.

Conceitualmente, um bloco é uma "Entidade autônoma que é significativa para sí própria", enquanto um elemento é "Uma parte de um bloco que sozinha não possui significado e está semanticamente ligado ao seu bloco" e o modificador é "Uma sinalização em um bloco ou elemento. Use os para mudar a aparência ou seu comportamento".

**Exemplo/Sintaxe**

```css
.block {
  /*CSS rules*/
}

/*Elements declared with 2 underscores, after block*/
.block__element {
  /*CSS rules*/
}

/*Modifiers declared with 2 dashes, after block or after element*/
.block- -modifier {
  /*CSS rules*/
}

/*Element and modifier together*/
.block__element--modifier {
  /*CSS rules*/
}
```

Para mais detalhes sobre as metodologias BEM:

http://getbem.com/

### DRY

DRY, que significa _"Don't Repeat Yourself"_, foi criado por Jeremy Clarke. A metodologia DRY, embora um pouco diferente de outra abordagem modular, também enfatiza em manter o estilo separado do conteúdo e evitar a especificidade. A abordagem da diretriz DRY se resume a agrupar propriedades CSS reutilizáveis, nomear esses grupos de forma lógica e adicionar seus seletores aos vários grupos CSS. Para maior clareza, vamos verificar em um exemplo de um dos artigos de referência.

Agrupe propriedades CSS reutilizáveis:

```css
 {
  background-color: #fff;
  border-color: #ccc;
}

 {
  background-color: #fff;
  border-color: #bbb;
}
```

Nomeie esses grupos de forma lógica:

```css
#LIGHT-WHITE-BACKGROUND,
.light-white-background {
  background-color: #fff;
  border-color: #ccc;
}

#MEDIUM-WHITE-BACKGROUND,
.medium-white-background {
  background-color: #fff;
  border-color: #bbb;
}
```

O nome do grupo é um ID no topo da lista e uma classe na parte inferior. Em seguida, adicione o restante dos seletores que compartilham propriedades acima do nome descritivo da classe que eles compartilham.

Adicione seus seletores aos vários grupos CSS:

```css
#LIGHT-WHITE-BACKGROUND,
.translation,
.entry .wp-caption,
#full-article .entry img,
.recent-comment .comment-text,
.roundup h3,
.post-header-sharing,
#post-categories td.label,
#post-archive roundup h3,
.subscription-manager ol,
.light-white-background {
  background-color: #fff;
  border-color: #ccc;
}

#MEDIUM-WHITE-BACKGROUND,
textarea:focus,
input:focus,
#author-email-form .input-focus,
#respond p input:focus,
.wpfc7 input:focus,
.medium-white-background {
  background-color: #fff;
  border-color: #bbb;
}
```

### SMACSS - (Scalable and Modular Architecture for CSS - _Arquitetura Escalável e Modular para CSS_)

A estrutura do SMACSS é baseada em cinco categorias, que são: Base, Layout, Módulo, Estado e Tema.

1. As regras básicas são os padrões e são quase exclusivamente seletores de elemento único. Seletores de atributos, seletores de pseudoclasse, seletores filho ou seletores irmãos também podem ser classificados como regras básicas.

2. As regras de layout dividem sua página da web em seções. Layouts mantêm um ou mais módulos juntos.

3. Os módulos ficam dentro dos componentes de layout e também podem ficar dentro de outros módulos.

4. As regras de estado definem como nossos módulos ou layouts serão exibidos em um determinado estado, seja oculto, expandido, ativo ou inativo. As regras de estado descrevem a aparência de um módulo ou layout em telas menores ou maiores e em visualizações diferentes, como a página inicial ou a página interna. Você aplica estados ao mesmo elemento como uma regra de layout ou como uma classe de módulo base.

5. As regras de tema agem de forma semelhante às regras de estado porque descrevem como os módulos ou layouts podem aparecer.

Para mais detalhes sobre as metodologias SMACSS:

http://smacss.com/

### Referências

[How to Implement Basic Modular CSS Guidelines](https://hackernoon.com/how-to-implement-basic-modular-css-guidelines-7r1632l2) disponível em [Hackernoon](https://hackernoon.com/)

[BEM, RSCSS, SMACSS — Escrevendo CSS de forma modular e escalável](https://medium.com/@anderson.falcao/bem-rscss-smacss-escrevendo-css-de-forma-modular-e-escal%C3%A1vel-f90da4678d3b) disponível em [Medium](https://medium.com/)

[What is Modular CSS?](https://spaceninja.com/2018/09/18/what-is-modular-css/) disponível em [Space Ninja](https://spaceninja.com/)

[BEM 101](https://css-tricks.com/bem-101/) disponível em [CSS Tricks](https://css-tricks.com/)
