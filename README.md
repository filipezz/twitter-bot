# R.U-Bot

Um bot do twitter que coleta dados dessa [planilha](https://docs.google.com/spreadsheets/d/1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ/pubhtml) usando a Google Sheets API e os tweeta em um certo intervalo de tempo.

## Pré requisitos

-   Node
-   [Twit](https://github.com/ttezel/twit) : Lib simplificada para o twitter
-   [Conta no GitHub](https://github.com/)
-   [Conta no Twitter](https://twitter.com/)
-   [Conta no Heroku](https://www.heroku.com/) : Para o deploy do bot

## Instalação ##

Com o Git e o Node.js instalado na sua maquina e a **URL** do projeto em mãos, crie uma pasta no seu pc e dentro dela abra o **cmd** ou **powershell** e digite os comandos abaixo:

```
git clone https://github.com/filipezz/twitter-bot.git
cd nome-da-sua-pasta
npm install
```



## Setup: Google Cloud Plataform ##
Antes de criarmos as api's que iremos utilizar é necessário vincular a nossa conta do Google com o [Google Cloud Plataform](https://cloud.google.com/), na página do **Google Cloud Plataform** você irá clicar no botão **Faça uma Avaliação Gratuita** e, em seguida, aceite os **Termos e Condições**

![google-cloud-step1](https://i.imgsafe.org/62/621a2df511.png)
![google-cloud-pay](https://i.imgsafe.org/62/6253ce8142.jpeg)


> Ps.: Mesmo pedindo o cartão de crédito, o recurso do **Google Cloud Plataform** que é usado aqui é **gratuito** 

### Criando o Projeto ###

Após a criação da conta, é preciso criar projeto e vincular a Api utilizada para o funcionamento do bot, para isso basta clicar no menu do topo da página "**Selecionar projeto**" e depois em "**Novo Projeto**":

![image](https://user-images.githubusercontent.com/34013325/55571155-52e3d400-56db-11e9-998f-bd99ab647403.png)

dê um nome ao projeto e clique no botão **criar** e em seguida, selecione-o.




### Api: Google Sheets API ###

Com o projeto criado é preciso habilitarmos e configurarmos a API, você irá clicar no menu lateral esquerdo no topo navegar até **API's e Serviços** > **Bibliotecas**:

![image](https://user-images.githubusercontent.com/34013325/55572521-22ea0000-56de-11e9-89cc-f477fe18bf65.png)

no campo de pesquisa basta procurar por **Google Sheets API**, clicar em **Ativar**, e aguardar até a ativação da api.


Após a ativação é só clicar em **Criar Credenciais**:

![image](https://user-images.githubusercontent.com/34013325/55572835-eb2f8800-56de-11e9-8292-fc3c4bf74084.png)

Procure por **Google Sheets API** no dropdown

![image](https://user-images.githubusercontent.com/52511902/65470345-40a05280-de41-11e9-845a-f786e2c8ccc7.png)

Em **De onde você chamará a API** selecione a opção "Servidor da Web" e em **Quais dados você acessará** selecione "Dados do Aplicativo". Na opção sobre **APP ou Compute Engine**, selecione "Não, nenhum". E finalmente, clique em "**Preciso de quais credenciais?**"

![image](https://user-images.githubusercontent.com/52511902/65470644-6e39cb80-de42-11e9-8b9f-3269015bc977.png)

Feito isso, irá pedir para criar uma conta de serviço. Crie e clique em **Criar**.

Um arquivo JSON será baixado para a sua máquina. Esse arquivo contém suas credenciais para o uso da API e se parecerá com isso:

```
{
  "type": "service_account",
  "project_id": 
  "private_key_id": 
  "private_key": 
  "client_email": 
  "client_id": 
  "auth_uri": 
  "token_uri": 
  "auth_provider_x509_cert_url": 
  "client_x509_cert_url": 
}

```
## Setup: Twitter


Vá em [https://apps.twitter.com/](https://developer.twitter.com/apps)  e clique em `Create New App`, e preencha todos os campos corretamente.

Vá em `Permissions` para dar conceder ao app a permissão de twittar marcando “Read, Write and Access direct messages”.
  
![image](https://user-images.githubusercontent.com/52511902/65471696-801d6d80-de46-11e9-8cbc-e8d7d78ca9a1.png)

A seguir vá na aba `key and Access Tokens` e clique em `Generate Access Token`.

Agora copie suas credenciais:  `Consumer Key`,  `Consumer Secret` ,  `Access Token`,  `Acess Token Secret`. Essas chaves serão necessárias e serão usadas como variáveis de ambiente no Heroku.


## Setup: Heroku

-   Crie uma  [conta Heroku](https://dashboard.heroku.com/)
-   Crie um novo app clicando em `New`, e depois em `Create new App`
-   Escolha um nome e clique em `Create App`

Escolha o Github como método de deployment e clique em conectar

![](https://cdn-images-1.medium.com/max/2000/1*QETgzVnscTLIxuD9XFEV5g.png)


Selecione o nome do seu repositório


![image](https://user-images.githubusercontent.com/52511902/65473469-3cc6fd00-de4e-11e9-901d-8f5e529d8446.png)


Agora é preciso configurar suas credenciais em Config Vars


![image](https://user-images.githubusercontent.com/52511902/65473347-c75b2c80-de4d-11e9-96b6-c66e54e97216.png)


Selecione `deploy branch` para subir o seu bot pela primeira vez


![image](https://user-images.githubusercontent.com/52511902/65473051-9dedd100-de4c-11e9-8915-62ba9a7d934f.png)


Vá na aba `resources` e ative o modo `worker dyno`.


![image](https://user-images.githubusercontent.com/52511902/65473391-00939c80-de4e-11e9-9ff9-23227f322dfd.png)


>PS: É possível ver os logs da sua aplicação indo em  `more` e depois `view logs`.

----------
# Setup.js

As credenciais do google ficam bugadas por alguma razão nas Config Vars do Heroku. A solução que eu achei foi fazer um outro arquivo que cria o **setup.js** dentro do servidor Heroku em produção.

![image](https://user-images.githubusercontent.com/52511902/65472736-63cfff80-de4b-11e9-9830-ab8528c6169a.png)

Ele cria um arquivo de credenciais com as suas credenciais do Google. Para isso, é preciso configurar mais algumas variáveis no Heroku.

![image](https://user-images.githubusercontent.com/52511902/65472812-b9a4a780-de4b-11e9-99c3-ebf3782bd2ac.png)

Em `GCP_CRED` cole o JSON baixado com suas credenciais **Google**. E em `GCP_KEY_FILE` ponha "./gcpconfig.json", que é o caminho onde suas credenciais serão criadas dentro do servidor.

>PS: A variável TZ significa "Timezone". Ele configura o fuso do seu servidor que por padrão no Heroku é o UTC

# E pronto! 
