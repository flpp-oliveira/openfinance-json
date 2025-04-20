#!/bin/bash

# Function to handle script interruption (Ctrl+C)
cleanup() {
  echo "\nInterrompido pelo usuário. Encerrando processos em segundo plano..."
  if [ -n "$BACKEND_PID" ]; then
    echo "Encerrando backend (PID: $BACKEND_PID)..."
    kill -9 $BACKEND_PID
  fi
  if [ -n "$FRONTEND_PID" ]; then
    echo "Encerrando frontend (PID: $FRONTEND_PID)..."
    kill -9 $FRONTEND_PID
  fi
  exit 1
}
trap cleanup SIGINT

# Log start of script
echo "Iniciando script de execução..."

# Check if the Python virtual environment is already activated
if [ -z "$VIRTUAL_ENV" ]; then
  echo "Ambiente virtual não está ativado. Ativando..."
  source backendpy/venv/bin/activate
  echo "Ambiente virtual ativado."
else
  echo "Ambiente virtual já está ativado."
fi

# Check if the backend is already running and terminate if necessary
echo "Verificando se o backend já está rodando..."
BACKEND_PID=$(lsof -i:8000 -t)
if [ -n "$BACKEND_PID" ]; then
  echo "Backend já está rodando. Derrubando processo $BACKEND_PID."
  kill -9 $BACKEND_PID
else
  echo "Backend não está rodando."
fi

# Start the Django backend in the background
cd backendpy
echo "Iniciando o backend Django..."
python manage.py runserver &
BACKEND_PID=$!
echo "Backend iniciado com PID: $BACKEND_PID."

# Check if the frontend is already running and terminate if necessary
cd ../front
echo "Verificando se o frontend já está rodando..."
FRONTEND_PID=$(lsof -i:5173 -t)
if [ -n "$FRONTEND_PID" ]; then
  echo "Frontend já está rodando. Derrubando processo $FRONTEND_PID."
  kill -9 $FRONTEND_PID
else
  echo "Frontend não está rodando."
fi

# Start the frontend
echo "Iniciando o frontend..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend iniciado com PID: $FRONTEND_PID."

# Wait for background processes to finish
echo "Aguardando processos em segundo plano..."
wait $BACKEND_PID
wait $FRONTEND_PID

# Log end of script
echo "Script finalizado."
