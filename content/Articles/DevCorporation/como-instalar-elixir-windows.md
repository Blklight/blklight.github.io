---
title: "Como instalar o elixir no Windows (usando WSL)"
abstract: ""
imageHeader: "https://miro.medium.com/max/720/1*dTdgZnJdP-bzvupED1UOJA.png"
cover: ""
createdDate: "2022-10-13 16:40"
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
  name: "Tanuke Sensei"
  quote: ""
cardComponent: "CardHorizontal"
---

Antes de qualquer coisa, gostaria de deixar claro que, esse tutorial não é meu, ele é do Adolfo Neto e pode ser visto nesse vídeo [aqui](https://www.youtube.com/watch?v=PKB6L7zgUjE). Eu apenas adaptei para fazer a instalação no WSL.

Verifique se você tem o WSL instalado e qual a versão do Linux que você tem. Para esse tutorial estou utilizando o WSL 2 com Ubuntu 20.04.

Vamos começar atualizando o seu sistema Linux, basta usar o comando:

```bash
sudo apt-get update
```

Depois informar sua senha de root e deixar a máquina atualizar.

**OBS:** Caso ocorra um erro parecido com o erro abaixo:

```bash
Failed to fetch http://ppa.launchpad.net/dawidd0811/neofetch/ubuntu/dists/focal/InRelease 403 Forbidden
```

Siga esse [tutorial](https://dev.to/deepika_banoth/how-i-solved-failed-to-fetch-http-ppa-launchpad-net-403-forbidden-2544) para ajustar e depois tente fazer o update novamente.

Linux atualizado, você pode começar entrando no [site do ASDF](https://asdf-vm.com/guide/getting-started.html) que é um gerenciador de linguagens de programação.

Dentro dele, você deve instalar as dependências que faltam no seu sistema (caso elas realmente estejam faltando);

Na hora de clonar o repositório, é recomendado usar o GIT, pois o homebrew é para _mac_ e o _pacman_ é apenas para archlinux e derivados.

Uma vez clonado, use o vscode ou outro editor de texto para abrir o arquivo **.bashrc** que fica na pasta do seu usuário Linux. No terminal o caminho ficaria assim: `/home/"seu-usuario"`.

Para acessar o arquivo (no vscode), basta digitar no terminal:

```bash
code .bashrc
```

No final do arquivo adicione as seguintes linhas, salve e pode fechar esse arquivo.

```bash
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
```

O elixir roda junto com o erlang, nesse caso você precisará instalar o plugin dele junto. Você precisa entrar [neste](https://github.com/asdf-vm/asdf-erlang) repositório git e utilizar o seguinte comando:

```bash
asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git
```

Caso ocorra algum erro na instalação, use o comando abaixo para instalar as dependências que faltam e tente rodar o comando acima novamente.

```bash
apt-get -y install build-essential autoconf m4 libncurses5-dev libwxgtk3.0-gtk3-dev libwxgtk-webview3.0-gtk3-dev libgl1-mesa-dev libglu1-mesa-dev libpng-dev libssh-dev unixodbc-dev xsltproc fop libxml2-utils libncurses-dev openjdk-11-jdk
```

O próximo passo é instalar o **erlang**, nesse caso estou instalando a versão 24.3:

```bash
asdf install erlang 24.3
```

Depois de instalado, você deve indicar se prefere ele instalado globalmente ou localmente, isso vai variar para cada pessoa ou projeto.

No meu caso, optei por colocar ele globalmente conforme abaixo, mas irei deixar o comando local caso prefira assim:

Globalmente: `asdf global erlang 24.3`

Localmente: `asdf local erlang 24.3`

Depois use o comando:

```bash
erl
```

Para verificar se o **erlang** está instalado corretamente. Você pode sair da interface do erlang apertando duas vezes os botões: `ctrl + c` .

Com tudo pronto até aqui, vamos instalar o elixir, começando com o plugin do mesmo:

```bash
asdf plugin-add elixir
```

Depois usamos o comando **list-all** para verificar qual versão é a melhor para instalar. Como anteriormente, eu optei por instalar a versão 24.3 e deixá-la global:

```bash
asdf list-all elixir
asdf install elixir 1.13.3-otp-24
asdf global elixir 1.13.3-otp-24
```

Agora para finalizar, verificamos qual a versão instalada e já podemos acessá-la.

```bash
elixir -v
iex
```

Você pode sair da interface do elixir apertando duas vezes os botões: `ctrl + c`.

Tudo pronto, agora você tem o **elixir** instalado na sua máquina.
