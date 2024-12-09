# ComicsCommerce (e-commerce) (desafio Front-End)

## Descrição

Este é um projeto de ecommerce desenvolvido em **React** inspirado no universo Marvel, com o objetivo de listar e detalhar quadrinhos utilizando a API oficial da Marvel. O projeto inclui duas telas principais:

1. **Tela Inicial**: Apresenta uma lista de quadrinhos disponíveis com filtros interativos.

2. **Tela do Quadrinho**: Apresenta o quadrinho com suas informações e preço.

Além disso, implementei um **modal lateral de checkout** para adicionar e visualizar itens no carrinho, proporcionando uma experiência de compra rápida e intuitiva.

### Tela Inicial

![Tela Inicial](./public/Tela%20inicial.png)

### Tela do Quadrinho

![Tela do Quadrinho](./public/Tela%20do%20Quadrinho.png)

### Tela com o Modal(Mostrando os produtos)

![Tela com o Modal(Mostrando os produtos)](./public/Tela%20com%20o%20modal.png)

### Tela com o Modal(Opção de Pagamento)

![Tela com o Modal(Opção de Pagamento)](./public/Tela%20com%20opcao%20de%20pagamento.png)

## Tecnologias Utilizadas

- **React com Redux** (para gerenciamento de estado).
- **TypeScript** (para maior robustez e manutenção do código).
- **SASS** (para estilização modular e flexível).
- **Material UI** (para componentes responsivos e acessíveis).
- **Vite** (para o ambiente de desenvolvimento).
- **LocalStorage** (para persistir os dados no carrinho entre sessões).
- **Framer Motion** (para animações).
- **React Hook Form** (para validação e gerenciamento do formulário de checkout).
- **React Router** (para navegação e estruturação de rotas).
- **Axios** (para consumo da API da Marvel e manipulação eficiente das requisições).
- **crypto-js** (para encriptação de dados sensíveis no localStorage).

## Funcionalidades

- Visualização de produtos disponíveis
- Consulta dos produtos
- Adição de produto no carrinho
- Atualização de quantidades ao adicionar o mesmo produto no carrinho.
- Exclusão de quantidades e do produto no carrinho.
- Adição de quantidade antes de clicar para comprar no carrinho.
- Redirecionamento para a página de checkout com os produtos selecionados.
- Persistência dos dados do carrinho usando o localStorage.
- Validação e submissão do formulário de pagamento.
- Utilização de Cupom de desconto no pagamento.

## Diferenciais do Projeto

- **Animações Interativas**: Transições fluidas usando Framer Motion, como o modal lateral de checkout e exibição dos produtos.

- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktops.

- **Checkout Intuitivo**: Modal lateral que melhora a experiência de usuário, com persistência de dados usando o LocalStorage.

- **Código Limpo e Escalável**: Estrutura desenvolvida com boas práticas de TypeScript, React, e Redux.

## Instalação

## Pré-requisitos

- **Node.js** (você pode verificar se está instalado usando node -v)
- **npm ou yarn** para gerenciar dependências.

## Passo a passo

1. Clone o repositório:

2. Navegue até o diretório do projeto:

cd ecommerce-app

3. Instale as dependências:

npm install

# ou

yarn install

4. Execute o projeto:

npm run dev

# ou

yarn dev
O projeto estará disponível em http://localhost:5173.

## Funcionalidades Futuras

- Sistema de login e autenticação.
- Implementação de pagamentos reais (ex. integração com Stripe)

Licença
Este projeto está licenciado sob a MIT License.
