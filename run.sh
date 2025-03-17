#!/bin/bash

eval "$(conda shell.bash hook)"

conda env create -f environment.yml

conda activate cd

python -m server.app &
PYTHON_PID=$!

# Set up a trap to kill the Python process when bash script exits
trap "kill $PYTHON_PID" EXIT

cd explorer/vue-project

npm install

#choose 1 line:
(sleep 2 && python -m webbrowser http://localhost:5173) &
# (sleep 2 && python -m webbrowser http://0.0.0.0:443) & #with Arnab's 0000

npm run dev