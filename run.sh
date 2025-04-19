#!/bin/bash

# Ativa o ambiente virtual do Python
cd backendpy
source venv/bin/activate

# Inicia o backend Django em segundo plano
python manage.py runserver &

# Inicia o frontend
cd ../front
npm run dev
