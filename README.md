# CLIMA Web App


### Pre-requisites:

  - nginx  
  - node
  - postgres + postgis
  - shp2pgsql
  

  
### First time installation

Clima is composed of several different services. They will all be installed inside the  `clima-app` directory. We also need a dedicated directory for the maps:

```sh
mkdir ~/clima-app
mkdir ~/tilemill-files
```


#### TileStream (mbtiles server)

Clone and install dependencies:
```sh
cd ~/clima-app
git clone https://github.com/paulovieira/tilestream-clima
cd tilestream-clima
sudo npm install
```

Then launch TileStream:
```sh
export TILEMILL_FILES_PATH=$HOME/tilemill-files
./index.js start --tilePort=8001  --tiles=$TILEMILL_FILES_PATH/export 
```

Note: the default port for this service is 8001

#### TileMill (map editor that exports mbtiles)

Clone and install dependencies:
```sh
cd ~/clima-app
git clone https://github.com/paulovieira/tilemill-clima
cd tilemill-clima
sudo npm install
```

Then copy-paste and edit the custom `clima-settings.json`:
```sh
cp clima-settings.json.template clima-settings.json
emacs clima-settings.json
```

Then launch TileMill:

```sh
export TILEMILL_HOSTNAME=clima.dev (or clima.fc.ul.pt)
export TILEMILL_FILES_PATH=$HOME/tilemill-files

node index.js --server=true --files=$TILEMILL_FILES_PATH --coreUrl=$TILEMILL_HOSTNAME --tileUrl=$TILEMILL_HOSTNAME
```

Note: the default ports for this service are 20008 and 20009.



#### The main HAPI application

Clone and install dependencies:
```sh
cd ~/clima-app
git clone https://github.com/paulovieira/clima
cd clima
sudo npm install
```

### Configuration of the main application

Define the environment:
```sh
export NODE_ENV=production (or dev or dev-no-auth)
```

Create the corresponding options file for the environment (to be used throughout the application via the [config](https://github.com/lorenwest/node-config) module):
```sh
cd ~/clima-app/clima
touch config/$NODE_ENV.js
emacs config/$NODE_ENV.js
```

Edit the necessary options in the configuration files. In principle only these should be changed for default.js:

  - for `config/default.js`: 
    + publicUri
    + publicPort
    + allowedLanguages
  - for `config/dev.js` and `config/production.js`: copy-paste from the configuration files available in Dropbox.

Create the database and populate with the initial data:
```
cd ~/clima-app/clima
createdb <database_name>  (used in  `config/dev.js` or  `config/production.js`)
./database/initialize_db.sh <database_name>
node database/populate-initial-data/
```

### Launch the main app

```sh
cd ~/clima-app/clima
export TILEMILL_FILES_PATH=$HOME/tilemill-files
export NODE_ENV=dev (or dev-no-auth, or production)
node index.js
```

### Using pm2 to launch the services

Make sure pm2 is installed:
```sh
pm2 list
sudo npm install pm2 -g
```

1) Start TileStream (note that we have to pass the arguments after "--"):

```sh
cd ~/clima-app/tilestream-clima
export TILEMILL_FILES_PATH=$HOME/tilemill-files

pm2 start index.js --name "tilestream-clima" -- --tiles=$TILEMILL_FILES_PATH/export --tilePort=8001
```

2) Start TileMill:

```sh
cd ~/clima-app/tilemill-clima
export TILEMILL_HOSTNAME=clima.fc.ul.pt (or clima.dev)
export TILEMILL_FILES_PATH=$HOME/tilemill-files

pm2 start index.js --name "tilemill-clima" -- --server=true --files=$TILEMILL_FILES_PATH --coreUrl=$TILEMILL_HOSTNAME --tileUrl=$TILEMILL_HOSTNAME
```

3) Start the main app:

```sh
cd ~/clima-app/clima
export TILEMILL_FILES_PATH=$HOME/tilemill-files
export NODE_ENV=dev (or production)

pm2 start index.js --name "clima"
```

#### Updating the app

pm2 list
pm2 stop x
pm2 delete x
git fetch and merge
pm2 start ...

#### Compiling the client-side templates

The client apps use [nunjucks](https://mozilla.github.io/nunjucks/) as the templating engine templates. Nunjucks should be installed globally. The `README.d` file in lib/web/client has more details on how to use nunjucks.

#### Other configurations

Nginx client_max_body_size
in the sites-available nginx configuration for clima.fc.ul.pt, make sure the "server" block has:

client_max_body_size 0;

(right below server_name, for instance)

### Installing TileMill plugins (manually)

1) make sure the plugins directory exists:
```sh
    mkdir /home/pvieira/.tilemill/node_modules
```

2) install the plugins manually by cloning the github repos
```sh
    cd /home/pvieira/.tilemill/node_modules

    git clone https://github.com/paulovieira/tilemill-easey-clima.git
    git clone https://github.com/paulovieira/tilemill-tablesort-clima.git
    git clone https://github.com/paulovieira/tilemill-lots-clima.git
```


