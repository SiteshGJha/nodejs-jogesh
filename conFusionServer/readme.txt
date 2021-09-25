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


############################################################################
Generating Private Key and Certificate
Go to the bin folder and then create the private key and certificate by typing the following at the prompt:

openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

Open the www file in the bin directory and update its contents as follows:


var https = require('https');
var fs = require('fs');

. . .

app.set('secPort',port+443);

. . .

/**
 * Create HTTPS server.
 */ 
 
var options = {
  key: fs.readFileSync(__dirname+'/private.key'),
  cert: fs.readFileSync(__dirname+'/certificate.pem')
};

var secureServer = https.createServer(options,app);

/**
 * Listen on provided port, on all network interfaces.
 */

secureServer.listen(app.get('secPort'), () => {
   console.log('Server listening on port ',app.get('secPort'));
});
secureServer.on('error', onError);
secureServer.on('listening', onListening);

Open app.js and add the following code to the file:

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

