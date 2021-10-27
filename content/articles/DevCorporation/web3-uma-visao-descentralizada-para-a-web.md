---
title: "Web3 - Uma visão para uma web descentralizada por Cloudflare"
abstract: ""
imageHeader: "https://i.imgur.com/lnJyNfD.png"
cover: ""
createdDate: "2021-10-04 10:30"
updatedDate: ""
channel: "Dev Corporation"
category: "code"
tags:
featured: false
type: "normal"
headerLayout: "landscape"
layout: ""
fontType: "base"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: ""
---

Ao ler isto, você é um participante da web. É espetacular que possamos escrever este blog e possamos exibi-lo para você sem a necessidade de operar um servidor ou escrever uma linha de código. Em geral, a web de hoje em dia nos empodera a participar mais do que poderiamos em qualquer momento no passado.

No último ano, [nós mencionamos](https://blog.cloudflare.com/internet-privacy/) a próxima fase da Internet seria sempre ativa, sempre segura, sempre privada. Hoje, investigamos uma tendência semelhante para a web, conhecida como Web3. Neste blog nós começaremos a explicar a Web3 no contexto da evolução da web e como o Cloudflare pode ajudar a apoiá-lo.

## Indo da Web 1.0 para a Web 2.0

Quando [Sir Tim Berners-Lee](https://webfoundation.org/about/vision/history-of-the-web/) escreveu documento seminal [“Information Management: A Proposal”](https://www.w3.org/History/1989/proposal.html), ele delinou uma visão da "web" como uma rede de sistemas de informação interconectado por links de hipertexto. Muitas vezes é assimilada à Internet, que é a rede de computadores em que opera. Os principais requisitos práticos para esta web incluem acessar a rede de maneira descentralizada por meios de máquina remotas e permitir que os sistemas sejam interligados sem a necessidade de qualquer controle ou coordenação central.

Esta visão materializou-se em um versão inicial da web que era composta por recursos estáticos entregue via uma rede distribuída de servidores e acessados principalmente em base de _somente-leitura_ pelo lado do cliente - "Web 1.0". O uso da web disparou com o número de websites bem mais que 1000% nos cerca de 2 anos que se seguiram a introdução do navegador gráfico Mosaic em 1993, com base de dados [World Wide Web Wanderer](https://www.mit.edu/people/mkgray/growth/).

O inicio do anos 2000 marcou um ponto de inflexão no crescimento da web e um periodo chave no seu desenvolvimento, à medida que as companias de tecnologia que sobreviveram ao crash das dot-com evoluiram para agregar valor aos clientes de novas maneiras em meio a um ceticismo crescente em torno da web:

- Navegadores de desktop como o Netscape tornaram-se comoditizados e pavimentaram o caminho para serviços da web nativos para a descoberta de conteúdo como mecanismos de pesquisa.
- Efeitos de rede que foram inicialmente impulsionados por hiperlinks em diretórios da web como o Yahoo! foram hiperscaladas por plataformas que permitiram o envolvimento do usuário e aproveitaram a inteligência coletiva como sites de avaliação.
- O enorme volume de dados gerados pela atividade da Internet e a crescente percepção de seu valor competitivo forçou as empresas a se tornarem especialistas em gerenciamento de banco de dados.

O’Reilly Media cunhou o conceito de Web 2.0 em uma tentativa de capturar essas mudanças nos princípios de design, que foram transformadores para a usabilidade e interatividade da web e continuam a ser blocos de construção centrais para empresas de Internet quase duas décadas depois.

No entanto, no meio da transformação da web 2.0, a web perdeu o contato com um de seus princípios básicos iniciais - a descentralização.

> #### "Descentralização: Nenhuma permissão é necessária de uma autoridade central para postar qualquer coisa na web, não há nenhum nó de controle central e, portanto, nenhum ponto único de falha ... e nenhum “interruptor de eliminação”!"
>
> -História da web por [Web Foundation](https://webfoundation.org/about/vision/history-of-the-web/)

## Um novo paradigma para a Internet

É aqui que entra a Web3. As últimas duas décadas provaram que construir um sistema escalável que descentralize o conteúdo é um desafio. Embora exista a tecnologia para construir tais sistemas, nenhuma plataforma de conteúdo atinge a descentralização em escala.

Há uma exceção notável: Bitcoin. Bitcoin foi conceituado em um [whitepaper](https://bitcoin.org/bitcoin.pdf) de 2008 por [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto) como um tipo de livro-razão distribuído conhecido como blockchain projetado para que uma rede ponto a ponto (P2P) pudesse realizar transações de maneira pública, consistente e à prova de violação.

Isso é muito dito em uma frase. Vamos dividir por termo:

- Uma rede ponto a ponto é uma arquitetura de rede. Ele consiste em um conjunto de computadores, chamados de nós, que armazenam e retransmitem informações. Cada nó é igualmente privilegiado, evitando que um nó se torne um único ponto de falha. No caso do Bitcoin, os nós podem enviar, receber e processar transações do Bitcoin.
- Um livro-razão é uma coleção de contas nas quais as transações são registradas. Para Bitcoin, o livro-razão registra as transações de Bitcoin.
- Um livro-razão distribuído é um livro-razão compartilhado e sincronizado entre vários computadores. Isso acontece por meio de um consenso, de modo que cada computador mantém uma réplica semelhante do livro-razão. Com o Bitcoin, o processo de consenso é realizado em uma rede P2P, a rede Bitcoin.
- Um blockchain é um tipo de razão distribuído que armazena dados em “blocos” que são criptograficamente vinculados em uma cadeia imutável que preserva sua ordem cronológica. O Bitcoin aproveita a tecnologia blockchain para estabelecer uma fonte única e compartilhada da verdade das transações e da sequência em que ocorreram, mitigando assim o [problema de gasto duplo.](https://en.wikipedia.org/wiki/Double-spending)

O Bitcoin - que atualmente [tem mais de 40.000 nós em sua rede](https://luke.dashjr.org/programs/bitcoin/files/charts/software.html) e processa mais de [US$ 30 bilhões em transações](https://coinmarketcap.com/currencies/bitcoin/) por dia - demonstra que um aplicativo pode ser executado de maneira distribuída em escala, sem comprometer a segurança. Ele inspirou o desenvolvimento de outros projetos de blockchain, como Ethereum que, além de transações, permite aos participantes implantar código que pode ser executado de forma verificável em cada um de seus nós.

Hoje, esses blockchains programáveis são vistos como [plataformas abertas e confiáveis ideais](https://www.coindesk.com/web3-transform-the-web) para servir como a infraestrutura de uma Internet distribuída. Eles são o lar de um ecossistema rico e crescente de [quase 7.000 aplicativos descentralizados](https://dappradar.com/rankings) (“Dapps”) que não dependem de uma única entidade para estar disponível. Isso fornece a eles maior flexibilidade sobre como melhor atender seus usuários em todas as jurisdições.

## A web é para o usuário final

Os sistemas distribuídos são inerentemente diferentes dos sistemas centralizados. Eles não devem ser pensados da mesma maneira. Os sistemas distribuídos permitem que os dados e seu processamento não sejam mantidos por uma única parte. Isso é útil para as empresas fornecerem resiliência, mas também é útil para redes baseadas em P2P, onde os dados podem ficar nas mãos dos participantes.

Por exemplo, se você fosse hospedar um blog à moda antiga, você colocaria um servidor, exporia na Internet (via [Cloudflare :D](https://blog.cloudflare.com/dyi-web-server-raspberry-pi-cloudflare/)), _et voilà_. Hoje em dia, seu blog seria hospedado em uma plataforma como WordPress, Ghost, Notion ou mesmo Twitter. Se essas empresas sofrerem uma interrupção, isso afetará muito mais pessoas. De forma distribuída, via IPFS, por exemplo, o conteúdo do seu blog pode ser hospedado e servido a partir de vários locais operados por diferentes entidades.

<figure>
    <img src="https://i.imgur.com/t3oMdY8.png" class="img-fluid mx-auto d-block mb-4" alt="Web 1.0">    
    <figcaption class="figure-caption text-center">Web 1.0</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/Vc6inQe.png" class="img-fluid mx-auto d-block mb-4" alt="Web 2.0">    
    <figcaption class="figure-caption text-center">Web 2.0</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/ClNYAXd.png" class="img-fluid mx-auto d-block mb-4" alt="Web 3.0">
    <figcaption class="figure-caption text-center">Web 3.0</figcaption>
</figure>

Cada participante da rede pode escolher o que hospedar / fornecer e pode receber diferentes conteúdos. Semelhante à sua rede doméstica, você controla o que compartilha e não compartilha tudo.

Este é um princípio fundamental da identidade descentralizada. Os mesmos princípios criptográficos que sustentam as criptomoedas como Bitcoin e Ethereum estão sendo aproveitados por aplicativos para fornecer serviços de identidade de plataforma cruzada seguros. Isso é fundamentalmente diferente de outros sistemas de autenticação, como OAuth 2.0, em que uma parte confiável deve ser contatada para avaliar a identidade de alguém. Isso se materializa na forma de botões “Login com `<provedor Big Cloud>`”. Esses provedores de nuvem são os únicos com dados, recursos e conhecimento técnico suficientes.

Em uma web descentralizada, cada participante possui uma chave secreta. Eles podem então usá-lo para se identificarem. Você pode aprender sobre esse sistema criptográfico em um blog anterior. Em uma configuração Web3 em que os participantes da web possuem seus dados, eles podem compartilhar seletivamente esses dados com os aplicativos com os quais interagem. Os participantes também podem aproveitar esse sistema para provar as interações que tiveram uns com os outros. Por exemplo, se uma faculdade emitir um [Identificador Descentralizado](https://www.w3.org/TR/did-core/) (DID), você poderá provar mais tarde que foi registrado nesta faculdade sem entrar em contato com a faculdade novamente. Identidades descentralizadas também podem servir como um espaço reservado para um perfil público, onde os participantes concordam em usar um blockchain como uma fonte de confiança. Isso é o que projetos como ENS ou Unlock visam fornecer: uma maneira de verificar sua identidade online com base em seu controle sobre uma chave pública.

Essa tendência de provar a propriedade por meio de uma fonte de confiança compartilhada é a chave para a mania NFT. Já [discutimos NFTs](https://blog.cloudflare.com/cloudflare-stream-now-supports-nfts/) antes neste blog. Os NFTs baseados em blockchain são um meio de transmissão de propriedade. O Blockchain permite que essas informações sejam verificadas e atualizadas publicamente. Se o blockchain afirma que uma chave pública que eu controlo é o proprietário de um NFT, posso consultá-lo em outras plataformas para provar a propriedade dele. Por exemplo, se a minha imagem de perfil nas redes sociais for um gato, posso provar que o referido gato está associado à minha chave pública. O que isso significa depende do que eu quero provar, especialmente com a proliferação de contratos NFT. Se quiser entender como funciona um contrato NFT, você pode [construir o seu próprio](https://blog.mycrypto.com/so-you-wanna-build-your-own-pfp-nft-project/).

## Como o Cloudflare se encaixa no Web3?

Descentralização e privacidade são desafios que estamos enfrentando na Cloudflare como parte de nossa missão de ajudar a construir uma Internet melhor.

Em um [post anterior](https://blog.cloudflare.com/next-generation-privacy-protocols/), Nick Sullivan descreveu as contribuições da Cloudflare para permitir a privacidade na web. Lançamos iniciativas para corrigir vazamentos de informações em HTTPS por meio do [Encrypted Client Hello](https://blog.cloudflare.com/encrypted-client-hello) (ECH), tornar o DNS ainda mais privado com o suporte a [Oblivious DNS-over-HTTPS](https://blog.cloudflare.com/oblivious-dns) (ODoH) e desenvolver [OPAQUE](https://blog.cloudflare.com/opaque-oblivious-passwords), que torna menos provável a ocorrência de violações de senha. Também lançamos nosso [pacote de localização de dados](https://blog.cloudflare.com/introducing-the-cloudflare-data-localization-suite/) para ajudar as empresas a navegar no [cenário regulatório](https://blog.cloudflare.com/data-privacy-day-2021-looking-ahead-at-the-always-on-always-secure-always-private-internet/) em constante evolução, dando-lhes controle sobre onde seus dados são armazenados, sem comprometer o desempenho e a segurança. Nós até construímos um [atestado de preservação de privacidade](https://blog.cloudflare.com/introducing-zero-knowledge-proofs-for-private-web-attestation-with-cross-multi-vendor-hardware/) baseado nas mesmas técnicas de prova de conhecimento zero que são essenciais para sistemas distribuídos, como [ZCash](https://electriccoin.co/blog/explaining-halo-2/) e [Filecoin](https://filecoin.io/blog/posts/filecoin-zk-snarks-zero-knowledge-but-a-lot-of-zero-knowledge/).

É emocionante pensar que já existem maneiras de mudar a web para melhorar a experiência de seus usuários. No entanto, existem algumas limitações para construir em cima da infraestrutura empolgante. É por isso que projetos como Ethereum e IPFS se baseiam em sua própria arquitetura. Eles ainda dependem da Internet, mas não operam com a Web como a conhecemos. Para facilitar a transição, a Cloudflare opera [gateways da web distribuídos](https://www.cloudflare.com/en-gb/distributed-web-gateway/). Esses gateways fornecem uma interface HTTP para os protocolos Web3: Ethereum e IPFS. Como o HTTP é o núcleo da web que conhecemos hoje, o conteúdo distribuído pode ser acessado com segurança e facilidade, sem exigir que o usuário opere um software experimental.

## Para onde vamos a seguir?

A jornada para uma web diferente é longa, mas emocionante. A infraestrutura construída nas últimas duas décadas é realmente impressionante. A Internet e a web agora fazem parte da vida de 4,6 bilhões de pessoas. Ao mesmo tempo, os 35 principais sites tiveram [mais visitas](https://www.ncta.com/whats-new/the-expanding-consolidation-of-the-consumer-internet-3) do que todos os outros (cerca de 2014). Os usuários têm menos controle sobre seus dados e dependem ainda mais de alguns jogadores.

O início da Web era estático. Então, a Web 2.0 veio para fornecer interatividade e serviço que usamos diariamente ao custo da centralização. Web3 é uma tendência que tenta desafiar isso. Com redes distribuídas construídas em protocolos abertos, os usuários da web têm autonomia para participar.

Na Cloudflare, estamos abraçando esse futuro distribuído. Aplicando o conhecimento e a experiência que adquirimos ao administrar uma das maiores redes de ponta, estamos tornando mais fácil para usuários e empresas se beneficiarem da Web3. Isso inclui operar um [pacote de produtos da Web distribuído](https://blog.cloudflare.com/announcing-web3-gateways), contribuir para os [padrões abertos](https://blog.cloudflare.com/cloudflares-approach-to-research/) e [promover a privacidade](https://blog.cloudflare.com/internet-privacy/).

Se você gostaria de ajudar a construir uma web melhor conosco, estamos [contratando](https://www.cloudflare.com/careers/jobs/).

_Artigo disponibilizado originalmente no blog oficial da [Cloudflare](https://blog.cloudflare.com/what-is-web3/)_.

_Nesta página apenas busco oferecer uma tradução do texto original._
