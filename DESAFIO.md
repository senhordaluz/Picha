# Desafio proposto

O teste proposto contempla tarefas de desenvolvimento e de implantação da aplicação Picha, uma aplicação de exemplo. A aplicação disponibilizada no site Real Python (realpython.com) coleta imagens via API e disponibiliza em uma galeria. O candidato deve escolher duas das tarefas propostas e incrementar a aplicação.

## Preparação

Leia o tutorial indicado. O tutorial ajudará a entender o objetivo da aplicação e como ela foi construída. https://realpython.com/asynchronous-tasks-with-django-and-celery 

Clone o repositório. Você deve usar a versão disponível no repositório https://github.com/realpython/Picha.

Rode o projeto. Para isso será necessário fazer instalações de dependências conforme o tutorial indica. Caso você não esteja familiarizado com Django, pesquise sobre qual o comando para fazer migrate e qual o comando para iniciar a aplicação. 

## Tarefas Propostas

Agora que você realizou a preparação e entende o que a aplicação faz e como opera-la, leia as tarefas propostas. Em seguida, escolha duas para executar. 

- Modernização de interface: Atualize o projeto adicionando uma nova interface de galeria de imagens e interface de feedback. A nova interface pode ser similar as existentes porém devem ser desenvolvidas utilizando um framework moderno como Vue.js ou React.js.

- Explorando os dados: adicione na base de dados a data em que cada fotografia foi realizada. Atualize a interface para exibir esta informação. Atualize o projeto substituindo o sistema de banco de dados Sqlite por uma das alternativas: PostgreSQL, MySQL, SQL Server, Maria DB ou similar.

- Monitorando o sistema: Construa um gráfico que mostre alguma característica da coleção de imagens ou do sistema. Por exemplo, um gráfico que mostre a data em que cada fotografia foi realizada, ou a quantidade de fotografias no sistema ao longo do tempo. O ideal é que esse gráfico atualize periodicamente sem que o usuário precise recarregar a página. Prefira utilizar a biblioteca d3.js.
  
- Preparação para implantação: proponha uma arquitetura de contêineres adequada para aplicação. Construa uma versão básica dessa com ao menos dois contêineres. Use as tecnologias de sua referência.
  
- Produção: Proponha implantação em nuvem detalhando quais serviços e qual a configuração seria adequada para hospedagem do serviço. Considere que a aplicação pode apresentar demanda elástica no acesso de usuários. Estime o custo mensal base e como ele varia com o aumento de usuários. Exemplifique com serviços do serviço de nuvem de sua preferencia. O tutorial utiliza a aplicação Supervisor mas na execução desta tarefa, a escolha de ferramentas é livre. 
