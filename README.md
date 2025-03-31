# Sistema de Gerenciamento de Usuários e Carros

## 📋 Sobre o Projeto

Aplicação para gerenciamento de usuários e carros com autenticação JWT, desenvolvida em Angular com TypeScript e integração com backend RESTful.

## 🚀 Estórias de Usuário

1. **EU COMO usuário QUERO poder me cadastrar NO SISTEMA para que eu possa acessar suas funcionalidades** (✅)

   - Critérios de Aceite:
     - Deve poder inserir todos os dados pessoais
     - Validação de campos obrigatórios
     - Impedimento de cadastro com email ou login duplicados

2. **EU COMO usuário QUERO poder fazer login NO SISTEMA para acessar minhas informações** (✅)

   - Critérios de Aceite:
     - Autenticação via login e senha
     - Geração de token JWT
     - Redirecionamento para área logada
     - Tratamento de credenciais inválidas

3. **EU COMO usuário AUTENTICADO QUERO poder gerenciar meus carros para manter meu cadastro atualizado** (✅)

   - Critérios de Aceite:
     - Adicionar novo carro
     - Listar carros cadastrados
     - Editar informações de carros
     - Remover carros
     - Validação de placa de carro única

4. **EU COMO usuário AUTENTICADO QUERO poder visualizar meu perfil para verificar minhas informações** (✅)

   - Critérios de Aceite:
     - Exibir dados pessoais
     - Mostrar data de criação da conta
     - Exibir último login
     - Permitir edição de informações

5. **EU COMO usuário AUTENTICADO QUERO listar todos os usuários para gerenciar o sistema** (✅)
   - Critérios de Aceite:
     - Listar usuários cadastrados
     - Filtrar usuários
     - Visualizar informações básicas

## 🛠️ Solução Técnica

### Arquitetura

- **Frontend**: Angular 17 com TypeScript
- **Autenticação**: JWT (JSON Web Token)
- **UI**: Angular Material
- **Testes**: Karma e Jasmine
- **Qualidade de Código**: ESLint, SonarQube

### Decisões Técnicas

- Utilização de módulos Angular para separação de responsabilidades
- Implementação de interceptor HTTP para manipulação de tokens
- Guards para proteção de rotas autenticadas
- Formulários reativos para validações robustas
- Tratamento de erros centralizado
- Configurações de ambiente separadas

### Benefícios da Arquitetura

- Alta escalabilidade
- Separação clara de componentes
- Manutenibilidade
- Performance otimizada
- Segurança na autenticação

## 📦 Pré-requisitos

- Node.js (v18+)
- Angular CLI (v17+)
- npm ou yarn

## 🔧 Instalação

1. Clonar repositório

```bash
git clone https://github.com/AugustoDevelop/challenger-car-ui.git
cd challenger-car-ui
```

2. Instalar dependências

```bash
npm install
```

## ▶️ Execução

### Desenvolvimento

```bash
npm start
```

Acesse: `http://localhost:4200`

### Produção

```bash
npm run build
```

Arquivos de build estarão em `dist/`

## 🧪 Testes

### Testes Unitários

```bash
npm test
```

### Cobertura de Testes

```bash
npm run test:coverage
```

### Lint

```bash
npm run lint
```

## 🔍 Análise de Código

```bash
npm run sonar
```

## 🚢 Deploy

### Configurações de Ambiente

- `environment.ts`: Desenvolvimento
- `environment.prod.ts`: Produção

### Estratégias de Deploy

- Containerização com Docker
- Integração com CI/CD
- Hospedagem em serviços de nuvem (AWS, Azure, GCP)

## 📄 Licença

MIT License
