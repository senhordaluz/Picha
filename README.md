
# Picha

Projeto criado a partir do seguinte [desafio](../blob/master/DESAFIO.md).

# Requisitos

- Python 3.4
- Postgres 11
- NODE 10
- Redis

Para execução por container, basta instalar Docker e Docker Compose executando os passos a seguir.

# Configuração do ambiente

## [Docker](https://www.docker.com/)

Para Windows, basta instalar o [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) e pular para a [execução do projeto](#inicialize-o-projeto).

Baixe e instale o Docker.

```sh
sudo apt-get install docker
```

Execute os passos de pós instalação do docker:

```sh
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker 
```

## [Docker Compose](https://docs.docker.com/compose/install/)

Baixe e instale o a última versão do Docker Compose.

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

*Nota: Este projeto utiliza configuração de docker versão `2.4`.*

# Inicialize o projeto

## Primeira execução

Para uma primeira execução do projeto utilizando o docker-compose basta executar o script `start-database`.

Ao executar este script os seguintes passos serão realizados:

- Os containers realizarão o processo de build completo até sua criação e execução.

- Serão executadas as migrações de inicialização do banco utilizado pelo Django.

- Os containers serão recriados e reiniciados para execução.

## Sobre os containers

Para facilitar o acesso e focar apenas no desenvolvimento.

Este projeto foi organizado em 4 containers que podem ser vistos descritos no arquivo `docker-compose.yml`.

### Postgres

Container padrão de uma instalação do Postgres 11.

### Redis

Container padrão de uma execução do Redis.

### Picha

Container criado com base numa imagem em Python 3.4.

Nele são executados 3 processos:

- Execução do Worker Celery do Projeto padrão em background (exibindo logs no terminal do container)
- Execução do agendador de tarefas do Celery do Projeto padrão em background (exibindo logs no terminal do container)
- Execução do servidor de desenvolvimento do Django (caso ocorra algum erro neste processo, o container será reiniciado)

### Frontend

Aqui temos a execução de um container padrão em Node executando o servidor de desenvolvimento do [Vue CLI](https://cli.vuejs.org/). Seus arquivos podem ser encontrados na pasta `./frontend`.

## Acesso ao projeto

Após inicializar o projeto, 3 portas serão disponibilizadas para acesso externo aos containers pelo `localhost`:

- `2254`: Porta de acesso ao banco do Postgres. *Nota: Informações de acesso ao banco podem ser manipuladas pelo arquivo `docker-compose.yml`*
- `2200`: Porta de acesso ao projeto em Django. As telas do projeto padrão continuam acessíveis nesta porta, bem como as URLs criadas para acesso ao banco via API.
- `2201`: Porta de acesso ao projeto cliente criado em [Vue JS](https://vuejs.org/) com interface baseada no [Vuetify](https://vuetifyjs.com/)

## Execução do Projeto

Para inicializar o projeto após a execução dos passos destacados para a [primeira execução](#primeira-execução), temos os seguintes comandos:

- `docker-compose up -d frontend`: Inicializa o container do Frontend en Vue JS e todas as suas dependencias (Banco, Redis, Celery e Django).
- `docker-compose down`: Finaliza a execução dos containers e os remove.
- `docker-compose exec picha sh`: Abre o terminal de acesso ao Container executando o Django
- `docker-compose exec frontend sh`: Abre o terminal de acesso ao Container executando o servidor do Vue JS (útil para instalar novas dependências).

# Decisões de Projeto

## Sobre o projeto inicial

O [Projeto Inicial](https://github.com/realpython/Picha) se trata de uma aplicação em Django que a cada 15 minutos regata a última foto publicada no [Flickr](https://www.flickr.com/explore), salva algumas referências num banco em Sqlite3 e permite a visualização dessas fotos numa interface simples criada com o Django.

## Explorando os dados

Optei por substituir o banco em Sqlite3 por um banco em Posgresql devido a familiaridade com o SGBD em questão. E preparei uma *migration* para incluir uma coluna representando a data de publicação da foto em questão.

Para a migration, levei em consideração que, para os dados já existentes, a data de criação do registro no banco `created_on` seria utilizada como data de publicação da foto `published` apenas para manter a integridade do banco definindo o campo de data de publicação como campo não nulo.

## Modernização de interface

Decidi por utilizar um projeto base em Vue JS como um cliente que iria consumir os dados gerados pelas taks do Celery por meio de uma API.

Para isso, foi necessário realizar algumas pequenas alterações no projeto inicial em Django para liberar o acesso as fotos por API.

### API

Utilizei a biblioteca [Django REST framework](https://www.django-rest-framework.org/) como abstração para agilizar a criação das rotas de acesso a API. Desta forma, com apenas alguns arquivos de declação a biblioteca pode gerar as rotas padrão rest para a entidade **Photo**. *Apesar de que nesta situação, apenas uma rota get retornando os resultados paginados seria o bastante*.

A rota utilizada foi `/api/photo` recebendo o parâmetro `page` *(número da página requisitada)* e retornando 9 resultados.

Além disso, para liberar o acesso [Cross Origin](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS), foi necessária a instalação de um midelaware chamado [Django CORS Headers](https://pypi.org/project/django-cors-headers/).

### Interface

Com uma API em Django estabelecida, bastava criar uma interface inicial utilizando componentes em Vuetify.

Optei por uma interface simplificada utilizando um padrão de [Cards](https://vuetifyjs.com/en/components/cards/) para organização das imagens paginadas.

Ao clicar para exibir informações detalhadas da imagem, o usuário verá a descrição *(HTML já formatado enviado pelo próprio Flickr)* contendo os links para melhor visualização da imagem.

### Client

Para consumo da requisição criada em Django e resgtar as fotos paginadas, utilizei um padrão mantendo a seguinte estrutura de pastas:

- `models`: Pasta contendo classes de Models representando as entidades que seriam utilizadas na camada de ViewModel do Vue;
- `responses`: Pasta contendo interfaces tipando as respostas de cada serviço consumido;
- `services`: Pasta contendo as classes e métodos representando os serviços da API;
- `repositories`: Pasta contendo os repositórios de acesso para cada uma das entidades consumidas pelo cliente.

Para criação da galeria de imagens foi consumido um repositório de *Photos* que seria responsável pelo resgate da lista de *models* instânciadas para serem exibidas em tela.

## Preparação para implantação

Para implantação, vejo duas opções utilizando a estrutura de containers já criada para uso em desenvolvimento.

### Dividido em 4 containers

A opção mais simples, seria aproveitar os 4 containers criados para desenvolvimento e criar os builds específicos para produção.

Sendo os do Redis e do Postgresql sem muita necessidade de alterção (levando em conta apenas as mudanças necessárias para segurança - como restrições de acesso por IP e alteração de usuários e senha padrão).

Para o Django, acedito que não seria necessário mudar o `Dockerfile`, apenas alterar os comandos de execução do container já seria o suficiente.

Para o servidor do cliente, seria necessária uma alteração no Dockerfile, já que o servidor de desenvolvimento não é otimizado para produção, portanto deveria ser utilizado um `Dockerfile` mais complexo que o utilizado para desenvolvimento, tendo em vista que seria necessário quebrar em passos para gerar um build dos arquivos estáticos e em seguida disponibiliza-los num container de servidor.

### Servidor compartilhado para API e Cliente

Nesta solução, a alteração seria nos containers do Django e do Vue JS.

Para isso, seria necessário a criação de um `Dockerfile` um pouco mais complexo para gerar o build dos arquivos estátivos do cliente em Vue JS e move-los para disponibiliza-los no mesmo conainer com o processo servidor que irá disponibilizar a aplicação em Djando.

Além disso, seria necessária algumas alterações na própria aplicação em Django para, data as rotas corretas, deferia retornar o HTML estático gerado pelo Vue JS e permitir que o mesmo resgatasse os assets necessários para execução no navegador cliente.
