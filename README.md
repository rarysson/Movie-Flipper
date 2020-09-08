# Movie Flipper

O Movie Flipper é uma curadoria de filmes. Onde nele você irá escolher dentre de uma lista de filmes quais você gosta e não gosta.

Esse projeto foi desenvolvido baseado no [desafio front end](https://github.com/vivadecora/projeto-front-end-vivadecora-nao-fazer-fork) da [Viva Decora](https://github.com/vivadecora).

## Tecnologias utilizadas

-   [Vue](https://vuejs.org/)
-   [Vuex](https://vuex.vuejs.org/)
-   [Axios](https://github.com/axios/axios)

## Usando o APP

Para usar online acesse o link: https://movie-flipper.herokuapp.com/

Para usar localmente, clone o repositório, vá na pasta criada e execute os comandos:

```
npm install
npm run serve
```

Dentro da pasta criada crie um arquivo chamado `.env.local`. Dentro desse arquivo coloque os seguintes valores (sem os parênteses):

```
VUE_APP_TOKEN=(SUA CHAVE DE ACESSO 'v4 auth' DA API DO The Movie Database)
VUE_APP_V3_TOKEN=(SUA CHAVE DE ACESSO 'v3 auth' DA API DO The Movie Database)
```

_Para conseguir uma chave de acesso da API do TMD acesse [Authorization - TMD](https://developers.themoviedb.org/4/getting-started/authorization)_
