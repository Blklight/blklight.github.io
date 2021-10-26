---
title: "Wordpress e JAMStack: Vocês podem ser bons amigos!"
abstract: ""
imageHeader:
cover:
createdDate: "2021-02-20 19:55"
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
  bio: "Ultimate Awakening"
  avatar: https://i.imgur.com/diuV6oy.jpg
---

## Introdução

Esta palestra vai tratar sobre as possibilidade de trabalho utilizando o Wordpress, um estável e seguro ambiente de desenvolvimento, com as JAMstacks, que são ótimas ferramentas modernas de desenvolvimento de sites estáticos. Vamos aparar as arestas e oferecer possibilidades de trabalho em conjunto com ambas as ferramentas.

## Senta que lá vem história

Se você está a mais de 10 anos no mercado, deve ter ouvido falar ou mesmo ter trabalhado com algumas das tecnologias que vou citar abaixo:

- jQuery
- Wordpress
- Angular
- React & Redux
- Vue & Vuex
- Svelte
- Typescript

A lista tende a ser muito grande, citei alguns aqui de cabeça. Em resumo, o desenvolvimento web passa pelas linguagens de front-end e de back-end, que temos no mercado. Vou comentar da minha experiência como desenvolvedor front-end, nas linguagens php e javascript. Sempre trabalhei desenvolvendo temas em Wordpress, pois meu público-alvo eram agências que terceizavam projetos.

O Wordpress se estabeleceu no mercado mundial tendo hoje 35% dos websites no mundo, crescendo 2% se comparando com 2019 e 4% se comparando com o ano anterior (fonte https://hostingtribunal.com/blog/wordpress-statistics/). Não dá pra negar que é o o nome de CMS mais lembrado nas cabeças dos desenvolvedores, gestores e publicitários. A documentação extensa, com a facilidade de criar temas (ou instalar temas prontos) faz com que seja uma opção barata e confiável para clientes, pois basta um servidor compartilhado com ao menos 256Mb de RAM para rodar.

Por outro lado, o desenvolvimento de soluções em javascript está evoluindo numa velocidade altíssima, com lançamentos anuais de atualizações da linguagem, favorecido pelos 4 cavaleiros do apocalípse React, Vue, Angular e Svelte. Desenvolvedores gostam de brinquedos novos, seguem hypes e gostam da experiência de desenvolvimento em uma única stack.

Nisto apresentamos, para o interlocutor que ainda está curioso, o termo JAMstack. Segundo William Oliveira, no seu blog:

> JAM é como LAMP (Linux, Apache, MySQL e PHP), um acrônimo para JavaScript, APIs e Markup. Onde temos uma marcação (HTML), que é gerada durante o deploy com um gerador de site estático, como o Hexo ou o Jekyll, que usei para criar este blog; caso seja um PWA o app será gerado durante o deploy e todo o restante é com o JavaScript e as APIs. Qualquer alteração de conteúdo, ação na interface ou algo do tipo, deve ser feito com JavaScript e os dados devem vir através de uma API. É o que já fazemos em Single Page Applications, mas agora também pensando em websites. Assim como nas SPAs, não devemos consultar o banco de dados, renderizar o HTML e enviar para o cliente via backend (com um PHP, Python ou a ferramenta que for), pois todo o conteúdo já foi renderizado e enviado para o usuário final.
>
> Fonte: https://woliveiras.com.br/posts/jamstack-introdu%C3%A7%C3%A3o-o-que-%C3%A9-jamstack/

As principais JAMstacks do mercado são Gatsby, Next.js, NUXT, Hugo, Jekyll, Gridsome, entre outras.

## O sangue está esquentando

Para ajudar ainda mais neste caldo de contradições, soluções em Javascript e Node como Netlify, Strapi, entre outras tem crescido entre os desenvolvedores que gostam de trabalhar com uma única linguagem.

Enquanto isto, o Wordpress mantem decisões duvidosas como manter o suporte para versões antigas dos Browsers utilizando oficialmente uma versão insegura de jQuery, a 1.12.4, apontado aqui.

Por outro lado, é inegável que o WP se mantem dominante mercado, definindo um padrão na cabeça de gestores e clientes. A usabilidade dele foi testada por milhões de usuários, que não querem pagar mensalidade de uso ou alguma licença por ele, sem perder o poder de configuração. Muitos plugins de SEO, cache e gestor de conteúdo rico ajuda ele a ser amigável para não desenvolvedores. E mesmo soluções como o Woocommerce, que é uma forma barata de ter uma loja online em um ambiente único.

## Treta!!

Como é natural de um ambiente muito competitivo, os principais players mantiveram suas opiniões guardadas dentro de seus círculos, evitando tretas em escala interplanetária. Mas o sangue esquentou! Como bons acompanhadores de treta, temos o dever histórico de destrinchar o certame para nossos amigos.

> “O JAMstack é uma regressão para a grande maioria das pessoas que o adotam. ” (...) “A usabilidade e funcionalidade é até inferior. Até mesmo a reconstrução de sites no JAMstack remonta aos dias do Movable Type, onde quanto maior o seu site fica, mais lento é para reconstruir ou atualizar os modelos.”
>
> Matt Mullenweg, criador do WP. Fonte: https://thenewstack.io/wordpress-co-founder-matt-mullenweg-is-not-a-fan-of-jamstack/ (traduzido pelo Google Tradutor)

Em poucas palavras, Matt Mullenweg acredita que a JAMstack é um retrocesso em termos de usabilidade e funcionalidade, comparando-a com o Movable Type. Continuando:

> Você pode consertar uma dúzia de serviços, cada um com sua própria conta e faturamento, por centenas de dólares por mês, para obter um resultado semelhante que você teria por alguns dólares por mês usando WordPress em hospedagem compartilhada ”, disse ele. “E seria mais frágil, porque a corrente é tão forte quanto seu elo mais fraco. Você está encadeando diferentes conjuntos de ferramentas, logins, faturamento, hospedagem ... qualquer parte disso pode quebrar todo o fluxo.”
>
> Matt Mullenweg. Fonte: https://thenewstack.io/wordpress-co-founder-matt-mullenweg-is-not-a-fan-of-jamstack/

Aqui ele traz algo que é o grande fiel da balança para o Wordpress: um projeto em Wordpress pode ser bem barato para ser mantido online, em comparação à outros projetos que tendem a ter como modelo de negócio a limitação de postagens e de formulários (sim, ele apontou o dedo para o Netlify). Basta uma hospedagem compartilhada, daquelas que encontramos aos montes no Brasil.

Mas como gostamos de expor as contradições, vamos pegar as melhores falas:

> “Muitas vezes há um momento certo quando uma tecnologia antiga está prestes a ser substituída pela próxima, onde o principal líder no campo sai e faz um forte argumento de que absolutamente nada está acontecendo (...) Um momento que acaba parecendo uma virada onde o novo estava inegavelmente presente o suficiente para valer a pena ser negado.”
>
> Mathias Biilmann, CEO do Netlify. Fonte: https://thenewstack.io/wordpress-co-founder-matt-mullenweg-is-not-a-fan-of-jamstack/

A provocação que Mathias Biilman, CEO da Netlify é válida. O crescimento da adoção da JAMstack está a um nível sensível na comunidade, com muitos desenvolvedores adotando soluções de sites estáticos que estão disponíveis globalmente na nuvem a uma velocidade quase instantânea. Claro que os criadores das JAMstacks estão cientes da necessidade de builds mais rápidas, logo o ponto de Mullenweg perderá sentido num futuro próximo.

> “O Jamstack é uma arquitetura que está conquistando as mentes dos desenvolvedores em todo o mundo e em toda a pilha de desenvolvimento da web (...) A adoção de novas arquiteturas geralmente começa com os desenvolvedores, então estou animado em ver uma empresa como, digamos, a Netlify ostentar mais de 1 milhão de desenvolvedores em sua plataforma Jamstack.”
>
> Ohad Eder-Pressman, co-founder and CEO of Stackbit (Fonte: https://wptavern.com/matt-mullenweg-and-jamstack-community-square-off-making-long-term-bets-on-the-predominant-architecture-for-the-web)

Um ponto muito importante é que desenvolvedores gostam de desafios, e de buscar soluções alternativas para os problemas. A linguagem javascript, que é o ponto chave para o desenvolvimento web, e que está em um ritmo atualizado de inovações, faz com que a adoção das JAMstacks cresça a um ritmo frenético, da mesma forma que ocorreu com o Wordpress a uns 15 anos atrás.

## Chegou a turma do deixa disso

Ambas as perspectivas apresentam pontos válidos. Nosso papel nesta palestra é que eles COEXISTAM pacificamente, como um pai que vê as tretas entre os filhos e intervem pelo bem da casa. Para que as coisas voltem a normalidade, cada lado vai ter que ceder.

### Wordpress

Você vai ser o gerenciador de conteúdo. Confiamos em você pra gerir tipos de postagens, upload de mídias, conteúdos diversos e campos personalizados com o seu nobre amigo Advanced Custom Fields. O Carbon Fields também pode brincar aqui, mas o Elementor, WP Bakery, Divi não podem te visitar. E você não vai mais gerenciar temas, só functions.php terá papel fundamental. E você não poderá ter mais os privilégios de monolito.

### JAMstack

Desculpe Netlify, não vamos usar você. Nada pessoal, sabe né, o cliente gosta de Wordpress. Por outro lado, você ficará responsável pelo front-end, em outra camada de desenvolvimento. Você vai ter que configurar as ferramentas do webpack (ou rollup), testes, deploy por conta.

Creio que seja melhor assim: cada um cede, e a gente integra todos numa grande mesa de bar. Cada um sentadinho num canto, com seu serviço em uma camada a parte - a camada do front e a camada do backend. Não Sibelius, não é micro-serviços aqui. (PS: sigam ele, ele comenta bastante sobre micro-serviços).

## Wordpress paga a primeira cerveja

Uma das coisas mais fantásticas do Wordpress é a sua API Rest. Em qualquer projeto wordpress, você pode acessar a API dele com a URL wp-json. Curioso? Alguns exemplos:

- https://wp.mateusavila.com.br/wp-json/
- https://bienaldolivro.com.br/wp-json/
- https://anticast.com.br/wp-json/

A integração com o plugin Advanced Custom Fields é potencializada com o plugin ACF to REST API (https://br.wordpress.org/plugins/acf-to-rest-api/), que insere os tipos personalizados nas devidas rotas automaticamente.

Se você quiser expandir estas funções da API do WP, recomendo estudar a implementação da função register_rest_route (https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/), que registra uma rota personalizada. Abaixo um exemplo bem simples dela em ação:

```php
<?php
// adicione o suporte para CORS
function add_cors_http_header(){
  header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');

// adicione uma rota e bote dentro da init
add_action('rest_api_init', function () {
  register_rest_route( '/options', '/v1', array(
    'methods' => 'GET',
    'callback' => 'get_options'
  ));
});

// repare na chave callback, vamos chamar ela aqui embaixo
function get_options (WP_REST_Request $request) {
  return wp_send_json(array(
    'facebook' => "pode ser qualquer código do wordpress, por exemplo um get_option('facebook')"
  ), 200);
}
// na função acima, é bem simples, retorna a string apenas.
// Se for acessar em seu projeto, a url seria http://URL-DO-PROJETO/wp-json/options/v1
```

## A JAMstack paga a batata-frita

Sabendo das rotas certinhas, uma boa prática para otimizar a sua aplicação é usar a função Promise.All e resolver todas estas requisições numa hora só, para aumentar a performance. Abaixo um exemplo bem simples:

```js
// Considere o valor de process.env.BASE_APIWP como o valor do .env da sua aplicação. Se quiser botar a URL direta, fique a vontade.
Promise.all([
  fetch(process.env.BASE_APIWP + "/wp/v2/pages/?slug=home&_fields=acf", {
    mode: "cors",
  }),
  fetch(process.env.BASE_APIWP + "/menu/v1", { mode: "cors" }),
  fetch(process.env.BASE_APIWP + "/options/v1", { mode: "cors" }),
])
  .then(async ([homeResource, menuResource, optionsResource]) => {
    const home = await homeResource.json();
    const menu = await menuResource.json();
    const options = await optionsResource.json();
    return { home, menu, options };
  })
  .then((response) => {
    const homePage = response.home[0];
    const menu = response.menu;
    const options = response.options;
    // aqui embaixo vocês inserem dentro do seu framework.
  });
```

## Agora que beberam bastante cerveja e comeram batata frita

Você pode desenvolver projetos unindo estes dois mundos em duas camadas, atendendo clientes, desenvolvedores e gestores, todos felizes. Até alguma tecnologia aparecer e mudar tudo de novo.

## E o nosso herói, o Nuxt?

O Nuxt é um framework opinativo feito em base do Vue.js, que possibilita a construções de aplicações web de alta qualidade sem necessariamente mexer nas configurações avançadas do webpack. Ele é recomendado para gerar soluções de SSR ou Estático Gerado, que é um SPA com suporte para SEO. Vamos abrir rapidinho uma instalação do Nuxt, mostrar o que ele tem, para facilitar o desenvolvimento.

_O conteúdo deste artigo foi exibido em uma palestra do Vue Norte e se encontra originalmente [neste site.](http://vue-norte.surge.sh/)_
