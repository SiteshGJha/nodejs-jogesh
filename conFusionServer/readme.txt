npm install -g express-generator

express <Project name>

cd <Project name>

#to run app
npm start 

#vs code config to debug do change in launch.json
{
    "configurations": [
        {
            "type": "node-terminal",
            "name": "JavaScript Debug Terminal",
            "request": "launch",
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Port",
            "address": "localhost",
            "port": 3000
        }
    ]
}