# CLIMA Web App


### First time installation

Clima is composed of several different services. They will all be installed inside the  `clima-app` folder:

```sh
mkdir ~/clima-app
```

#### TileMill (map editor)

```sh
cd ~/clima-app
git clone https://github.com/paulovieira/tilemill-clima
cd tilemill-clima
sudo npm install
```

Then copy-paste and edit the custom `clima-settings.json`
```sh
cp clima-settings.json.template clima-settings.json
```

Then launch TileMill with
```sh
export TILEMILL_FILES_PATH=$HOME/tilemill-files
./index.js --server=true --files=$TILEMILL_FILES_PATH
```

Note: the default ports for this service are 20008 and 20009.

#### TileStream (mbtiles server)

```sh
cd ~/clima-app
git clone https://github.com/paulovieira/tilestream-clima
cd tilestream-clima
sudo npm install
```

Then launch TileStream with
```
export MBTILES_PATH=$HOME/tilemill-files/export
./index.js start --tiles=$MBTILES_PATH --tilePort=8001
```

Note: the default port for this service is 8001

#### The main HAPI application

```sh
cd ~/clima-app
git clone https://github.com/paulovieira/clima
cd clima
sudo npm install
```

### Configuration

Define the environment:
```sh
export NODE_ENV=production/dev/dev-no-auth
```

Create the corresponding options file for the environment (to be used throughout the application via the [config](https://github.com/lorenwest/node-config) module):
```sh
cd ~/clima-app/clima
touch config/$NODE_ENV.js
emacs config/$NODE_ENV.js
```

Create the database and populate with the initial data:
```
createdb <database_name>
cd ~/clima-app/clima
./database/initialize_db.sh <database_name>
node database/populate-initial-data/
```

### Launch the main app
```sh
cd ~/clima-app/clima
node index.js
```

### Using pm2 to launch the services

Make sure pm2 is installed and that the environment is set correctly
```sh
sudo npm install pm2 -g
export NODE_ENV=production/dev
```

Start the main app:
```sh
cd ~/clima-app/clima
pm2 start index.js --name "clima"
```

Start TileStream (note that we have to pass the arguments after "--"):
```sh
cd ~/clima-app/tilestream-clima
export MBTILES_PATH=...
pm2 start index.js --name "tilestream-clima" -- --tiles=$MBTILES_PATH --tilePort=8001
```

Start TileMill:
```sh
cd ~/clima-app/tilemill-clima
pm2 start index.js --name "tilemill-clima" -- --server=true
```


#### Compiling the client-side templates

The client apps use [nunjucks](https://mozilla.github.io/nunjucks/) as the templating engine templates. Nunjucks should be installed globally. The `README.d` file in lib/web/client has more details on how to use nunjucks.

