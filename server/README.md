Server (Nodejs)
===============



===================
### Dependendencies
The following dependencies are needed globally

* Nodejs (~0.10.33)
* Node Version Manager (~3.4.5)


===========
### Install

Install the Node Version Manager

```bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.19.0/install.sh | bash
```

Get the Nodejs beta-version 0.11.13 to enable the new ECMAscript 6 support

```bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.19.0/install.sh | bash
$ nvm install v0.11.13
```

Install all needed nodejs requirements by executing the command
inside /server

```bash
$ npm install
```

============
### Workflow

Change your Nodejs version to beta

```bash
$ nvm use 0.11.13
```

Start the server and have fun

```bash
$ node --harmony app.js
```

========
### Todo

* Find a project topic