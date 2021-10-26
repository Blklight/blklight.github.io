---
title: "Sobre commits, commits semânticos e commits atômicos"
abstract: ""
imageHeader: "https://i.imgur.com/eRs7j5A.png"
cover: ""
createdDate: "2021-02-16 15:00"
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

## O que é um Commit?

Em um sistema de controle de versão, um commit é uma operação que envia as alterações mais recentes do código-fonte para o repositório do seu projeto, tornando essas alterações parte da revisão principal do repositório.

Os sistemas de controle de versão permitem reverter facilmente para versões anteriores. Nesse contexto, um commit dentro de um sistema de controle de versão é protegido, pois é facilmente revertido, mesmo após o commit ter sido aplicado.

## Commits semânticos

Os commits semânticos (_a.k.a. Conventional Commits_) é uma maneira simples para se descrever as mensagens dos nossos commits utilizando-se de uma convenção simples.

Esta convenção define um conjunto de regras para criar um histórico de commit explícito, o que facilita a criação de ferramentas automatizadas baseadas na especificação. Esta convenção se encaixa com o [SemVer](https://semver.org/), descrevendo os recursos, correções e modificações que quebram a compatibilidade nas mensagens de commit.

A mensagem do commit deve ser estruturada da seguinte forma:

```git
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

### Tipos

A primeira e principal descrição de um commit semântico, refere-se a seu tipo, os quais possuem a finalidade de comunicar a intenção de processamento que o utilizador teve em sua execução.

> #### Observação
>
> Na [documentação oficial](https://www.conventionalcommits.org/pt-br/v1.0.0/), é dito que são permitidos tipos adicionais além de `fix:` e `feat:`, por exemplo [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (baseado na Convenção do [Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recomenda-se `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, entre outros.

Abaixo será enumerado os principais tipes descritos na documentação do Angular Commit Message Guidelines:

1. `build`: Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm),
2. `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs);
3. `docs`: referem-se a inclusão ou alteração somente de arquivos de documentação;
4. `feat`: Tratam adições de novas funcionalidades ou de quaisquer outras novas implantações ao código;
5. `fix`: Essencialmente definem o tratamento de correções de bugs;
6. `perf`: Uma alteração de código que melhora o desempenho;
7. `refactor`: Tipo utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada;
8. `style`: Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.;
9. `test`: Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD);
10. `chore`: Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas que realmente não entram em produção;
11. `env`: basicamente utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.

Também, o Guidelines, recomenda o tipo improvement para commits que melhoram uma implementação atual sem adicionar um novo recurso ou consertar um bug.

Observe que esses tipos não são obrigatórios pela especificação do Conventional Commits.

Estes citados anteriormente são os principais tipos utilizados, mas existem outros diversos que podem ser utilizados e também podem ser adequados a necessidade de sua equipe de desenvolvimento e projeto.

## Commits atômicos

Uma das principais definições desta metodologia é de que as tarefas/implementações desenvolvidas devem ser divididas em átomos: _**atomic commits**_, que se consistem de unidades objetivas que implementam uma única funcionalidade, ou tratam a correção de um único erro.

Ou seja, a cada correção ou implantação individual se deve executar um processo de commit, algo que segue outro conceito do **Clean Architecture**, o _Single Responsiblity Principle do SOLID_.

### Referências

[O que é Commit e como usar Commits Semânticos](https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/) disponível em [GeekHunter](https://blog.geekhunter.com.br/)

[Documentação oficial Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)

[Vamos conversar sobre boas práticas de commit? ](https://www.linkedin.com/pulse/vamos-conversar-sobre-boas-pr%C3%A1ticas-de-commit-c%C3%A2ndido-guedes) artigo por [Herlon Manollo Candido Guedes](https://br.linkedin.com/public-profile/in/herlon-manollo-candido-guedes?trk=author_mini-profile_title&challengeId=AQHmJPYBc0T0YQAAAXesRimUWNUIB4WOIgm5XdcdKgJ-Fii_1lUSMyUZ9SjUSv_d6ahV8j5xfi6606iNMYIfgSVw9aXJVjDk7A&submissionId=e129db80-7150-6416-89ab-64df6a86c95d)

[Que tal começar a usar commits semânticos?](https://blog.cubos.io/que-tal-comecar-a-usar-commits-semanticos/) disponível em [Cubos](https://blog.cubos.io/)
