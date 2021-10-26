---
title: "Development: Mode On - Guia para ajudar a configurar o seu ambiente de desenvolvimento"
abstract: "Um compilado de material e dicas para que você consiga criar em seu computador um ambiente de desenvolvimento, além de mostrar o inicio do desenvolvimento de aplicações front e back-end com alguns frameworks"
imageHeader: https://i.imgur.com/Te8hqVv.jpg
cover: ""
createdDate: "2021-02-06 18:45"
updatedDate: ""
channel: "Dev Corporation"
category: "LPJ"
tags: ""
featured: true
type: "stories"
headerLayout: "fullpage"
layout: "two-column"
fontType: "monospace"
isPublished: true
author:
  name: "Ultimate Mercer"
  quote: ""
---

## **WSL - Windows Subsystem for Linux (Subsistema do Windows para Linux)**

O WSL permite que os desenvolvedores executem um ambiente GNU/Linux, incluindo a maioria das ferramentas de linha de comando, utilitários e aplicativos, diretamente no Windows, sem modificações e sem a sobrecarga de uma máquina virtual tradicional ou instalação dualboot.

Você pode:

- Escolha sua distribuição do Linux/GNU favorita na Microsoft Store.
- Execute as ferramentas de linha de comando comuns, como grep, sed, awk ou outros binários ELF-64.
- Execute scripts de shell do Bash e aplicativos de linha de comando do GNU/Linux, incluindo:
- Ferramentas: vim, emacs, tmux
- Linguagens: Node.js, Javascript, Python, Ruby, C/C++, C# & F#, Rust, Go etc.
- Serviços: SSHD, MySQL, Apache, lighttpd, MongoDB, PostgreSQL.
- Instale o software adicional usando o seu próprio gerenciador de pacotes de distribuição do GNU/Linux.
- Invoque aplicativos do Windows usando um shell de linha de comando do UNIX.
- Invoque aplicativos do GNU/Linux no Windows.

#### _**O que é o WSL 2?**_

O WSL 2 é uma nova versão da arquitetura do Subsistema do Windows para Linux que capacita o Subsistema do Windows para Linux a executar binários ELF64 Linux no Windows. As metas principais dele são aumentar o desempenho do sistema de arquivos e adicionar compatibilidade completa com a chamada do sistema.

Essa nova arquitetura altera como esses binários do Linux interagem com o Windows e o hardware do computador, mas ainda fornece a mesma experiência do usuário que no WSL 1 (a versão atual amplamente disponível).

As distribuições individuais do Linux podem ser executadas com a arquitetura do WSL 1 ou do WSL 2. Cada distribuição pode passar por upgrade ou downgrade a qualquer momento e você pode executar distribuições do WSL 1 e do WSL 2 lado a lado. O WSL 2 usa uma arquitetura totalmente nova que se beneficia do uso de um kernel Linux real.

## **Guia de instalação**

Existem dois tipos de instalação possível, uma instalação simplificada para aqueles que são participantes no Programa Windows Insiders, você pode encontrar informações [aqui](https://docs.microsoft.com/pt-br/windows/wsl/install-win10#simplified-installation-for-windows-insiders). Ou a instalação manual, contendo seis etapas(As etapas de instalação manual para WSL estão listadas abaixo e podem ser usadas para instalar o Linux em qualquer versão do Windows 10.).

#### _Etapa 1 - Habilitar o Subsistema do Windows para Linux_

Antes de instalar qualquer distribuição do Linux no Windows, você precisará primeiro habilitar o recurso opcional "Subsistema do Windows para Linux".

Abra o PowerShell como administrador e execute:

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

Agora, é recomendável passar para a etapa 2, de atualização para o WSL 2. Mas, se você desejar instalar apenas o WSL 1, será possível reiniciar o computador e passar para a Etapa 6 – Instalar a distribuição do Linux de sua escolha. Para atualizar para o WSL 2, aguarde o seu computador ser reiniciado e passe para a próxima etapa.

#### _Etapa 2 - Verificar os requisitos para executar o WSL 2_

Para atualizar para o WSL 2, você precisa estar executando o Windows 10.

- Para sistemas x64: Versão 1903 ou superiores, com o Build 18362 ou superiores.
- Para sistemas ARM64: Versão 2004 ou superiores, com o Build 19041 ou superiores.
- Os builds inferiores a 18362 não dão suporte a WSL 2. Use o Assistente do Windows Update para atualizar a sua versão do Windows.

Para verificar a sua versão e o número de build, selecione a tecla do logotipo do Windows + R, digite winver e selecione OK. (Ou digite o comando ver no prompt de comando do Windows). Atualize para a versão mais recente do Windows no menu Configurações.

> ##### **Observação**
>
> Se você estiver executando o Windows 10 versão 1903 ou 1909, abra "Configurações" no menu do Windows, navegue até "Atualizações e Segurança" e selecione "Verificar Atualizações". O número de Build precisa ser 18362.1049+ ou 18363.1049+ e o nº do build secundário deve ser maior que .1049. Leia mais: [O suporte a WSL 2 estará disponível em breve nas Versões 1903 e 1909 do Windows 10](https://devblogs.microsoft.com/commandline/wsl-2-support-is-coming-to-windows-10-versions-1903-and-1909/). Confira as [instruções de solução de problemas](https://docs.microsoft.com/pt-br/windows/wsl/troubleshooting#im-on-windows-10-version-1903-and-i-still-do-not-see-options-for-wsl-2).

#### _Etapa 3 - Habilitar o recurso de Máquina Virtual_

Antes de instalar o WSL 2, você precisa habilitar o recurso opcional **Plataforma de Máquina Virtual**. Seu computador exigirá [funcionalidades de virtualização](https://docs.microsoft.com/pt-br/windows/wsl/troubleshooting#error-0x80370102-the-virtual-machine-could-not-be-started-because-a-required-feature-is-not-installed) para usar esse recurso.

Abra o PowerShell como administrador e execute:

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Reinicie o computador para concluir a instalação do WSL e a atualização para o WSL 2.

#### _Etapa 4 - Baixar o pacote de atualização do kernel do Linux_

1. Baixar o pacote mais recente:

- [Pacote de atualização do kernel do Linux do WSL2 para computadores x64.](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
  > ##### **Observação**
  >
  > Se estiver usando um computador ARM64, baixe o [pacote ARM64](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_arm64.msi). Se você não tiver certeza do tipo do seu computador, abra o Prompt de Comando ou o PowerShell e insira: systeminfo | find "System Type".

2. Execute o pacote de atualização baixado na etapa anterior. (Clique duas vezes para executar. Você receberá uma solicitação para fornecer permissões elevadas; selecione 'sim' para aprovar essa instalação.)

Depois que a instalação for concluída, vá para a próxima etapa: configurar o WSL 2 como a sua versão padrão ao instalar novas distribuições do Linux (ignore essa etapa se você quiser que as novas instalações do Linux sejam definidas como WSL 1).

> ##### **Observação**
>
> Para obter mais informações, leia o artigo [Alterações na atualização do kernel do Linux para o WSL 2](https://devblogs.microsoft.com/commandline/wsl2-will-be-generally-available-in-windows-10-version-2004), disponível no [blog da linha de comando do Windows.](https://aka.ms/cliblog)

#### _Etapa 5 - Definir o WSL 2 como a sua versão padrão_

Abra o PowerShell e execute este comando para definir o WSL 2 como a versão padrão ao instalar uma nova distribuição do Linux:

```powershell
wsl --set-default-version 2
```

#### _Etapa 6 - Instalar a distribuição do Linux de sua escolha_

1. Abra a [Microsoft Store](https://aka.ms/wslstore) e escolha sua distribuição do Linux favorita.
   Os links a seguir abrirão a página da Microsoft Store para cada distribuição:

   - [Ubuntu 16.04 LTS](https://www.microsoft.com/store/apps/9pjn388hp8c9)
   - [Ubuntu 18.04 LTS](https://www.microsoft.com/store/apps/9N9TNGVNDL3Q)
   - [Ubuntu 20.04 LTS](https://www.microsoft.com/store/apps/9n6svws3rx71)
   - [OpenSUSE Leap 15.1](https://www.microsoft.com/store/apps/9NJFZK00FGKV)
   - [SUSE Linux Enterprise Server 12 SP5](https://www.microsoft.com/store/apps/9MZ3D1TRP8T1)
   - [SUSE Linux Enterprise Server 15 SP1](https://www.microsoft.com/store/apps/9PN498VPMF3Z)
   - [Kali Linux](https://www.microsoft.com/store/apps/9PKR34TNCV07)
   - [Debian GNU/Linux](https://www.microsoft.com/store/apps/9MSVKQC78PK6)
   - [Fedora Remix para WSL](https://www.microsoft.com/store/apps/9n6gdm4k2hnc)
   - [Pengwin](https://www.microsoft.com/store/apps/9NV1GV1PXZ6P)
   - [Pengwin Enterprise](https://www.microsoft.com/store/apps/9N8LP0X93VCP)
   - [Alpine WSL](https://www.microsoft.com/store/apps/9p804crf0395)

2. Na página da distribuição, selecione "Obter".

Na primeira vez que você iniciar uma distribuição do Linux recém-instalada, uma janela de console será aberta e será solicitado que você aguarde um ou dois minutos para que os arquivos sejam descompactados e armazenados em seu PC. Todas as futuras inicializações deverão levar menos de um segundo.

Em seguida, você precisará [criar uma conta de usuário e uma senha para sua nova distribuição do Linux.](https://docs.microsoft.com/pt-br/windows/wsl/user-support)

#### _**Definir a versão de distribuição para WSL 1 ou WSL 2**_

Verifique a versão do WSL atribuída a cada uma das distribuições do Linux instaladas abrindo a linha de comando do PowerShell e inserindo o comando (disponível somente no [Windows Build 18362 ou superior](ms-settings:windowsupdate)): `wsl -l -v`

```powershell
wsl --list --verbose
```

Para definir uma distribuição para ter suporte de qualquer versão do WSL, execute:

```powershell
wsl --set-version <distribution name> <versionNumber>
```

Assegure-se de substituir `<distribution name>` pelo nome real da sua distribuição e `<versionNumber>` pelo número '1' ou '2'. Você pode retornar ao WSL 1 a qualquer momento executando o mesmo comando acima, mas substituindo “2” por “1”.

> ##### **Observação**
>
> A atualização da WSL 1 para a WSL 2 pode levar vários minutos para ser concluída, dependendo do tamanho da sua distribuição alvo. Se você estiver executando uma instalação mais antiga (herdada) do WSL 1 da Atualização para Criadores ou da Atualização de Aniversário do Windows 10, poderá encontrar um erro de atualização. Siga estas instruções para [desinstalar e remover as distribuições herdadas.](https://docs.microsoft.com/pt-br/windows/wsl/install-legacy#uninstallingremoving-the-legacy-distro)
>
> Se `wsl --set-default-version` resultar como um comando inválido, insira `wsl --help`. Se `--set-default-version` não estiver listado, isso significa que o sistema operacional não é compatível com ele, e você precisará atualizá-lo para a versão 1903, Build 18362 ou superior.
>
> Você verá esta mensagem depois de executar o comando: `WSL 2 requires an update to its kernel component. For information please visit https://aka.ms/wsl2kernel`. Você ainda precisa instalar o pacote de atualização MSI do kernel do Linux.

Além disso, se quiser tornar o WSL 2 sua arquitetura padrão, você poderá fazê-lo com este comando:

```powershell
wsl --set-default-version 2
```

Isso definirá a versão de qualquer nova distribuição instalada no WSL 2.

Para mais informações acesse a página oficial [aqui.](https://docs.microsoft.com/pt-br/windows/wsl/install-win10)
