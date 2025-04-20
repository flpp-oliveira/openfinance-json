# OpenFinance JSON

Este projeto é uma aplicação que utiliza React no front-end e Django no back-end para gerar e manipular arquivos JSON relacionados a Open Finance.

## Estrutura do Projeto

- **backendpy/**: Contém o código do back-end desenvolvido em Django.
  - `api/`: Inclui os módulos principais da API, como modelos, visualizações, serializers e geradores de JSON.
  - `migrations/`: Arquivos de migração do banco de dados.
  - `certs/`: Certificados utilizados pela aplicação.
- **front/**: Contém o código do front-end desenvolvido em React com Vite.
  - `src/`: Código-fonte principal do front-end.
  - `public/`: Arquivos públicos, como imagens e ícones.

## Tecnologias Utilizadas

- **Back-end**: Django, SQLite
- **Front-end**: React, Vite

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/flpp-oliveira/openfinance-json.git
   ```

2. Configure o ambiente do back-end:

   ```bash
   cd backendpy
   python -m venv venv
   source venv/bin/activate  # No Windows, use venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Configure o ambiente do front-end:

   ```bash
   cd front
   npm install
   npm run dev
   ```

4. Acesse a aplicação:

   - Front-end: `http://localhost:5173`
   - Back-end: `http://localhost:8000`

## Repositório do Projeto

Este projeto está disponível no GitHub: [openfinance-json](https://github.com/flpp-oliveira/openfinance-json)
