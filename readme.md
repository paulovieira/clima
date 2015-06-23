# CLIMA Web App


### First time installation

Clima is composed of several different services. They will all be installed inside the  `clima-app` folder:

```
mkdir ~/clima-app
```

#### TileMill (map editor)

```
cd ~/clima-app
git clone https://github.com/paulovieira/tilemill-clima
cd tilemill-clima
sudo npm install
```

Then launch TileMill with

```
./index.js --server=true
```

Note: the default ports for this service are 20008 and 20009.

#### TileStream (mbtiles server)

```
cd ~/clima-app
git clone https://github.com/paulovieira/tilestream-clima
cd tilestream-clima
sudo npm install
```

Then launch TileStream with
```
export MBTILES_PATH=...
./index.js start --tiles=$MBTILES_PATH --tilePort=8001
```

Note: the default port for this service is 8001

#### The main HAPI application

```
cd ~/clima-app
git clone https://github.com/paulovieira/clima
cd clima
sudo npm install
```

### Configuration

Define the environment:
```
export NODE_ENV=production/dev/dev-no-auth
```

Create the corresponding options file for the environment (to be used throughout the application via the [config](https://github.com/lorenwest/node-config) module):
```
cd ~/clima-app/clima
touch config/$NODE_ENV.js
emacs config/$NODE_ENV.js
```

Create the database and populate with the initial data:
```
cd ~/clima-app/clima
./database/initialize_db.sh <database_name>
node database/populate-initial-data/
```

### Launch the main app
```
cd ~/clima-app/clima
node index.js
```

### Using pm2 to launch the services

Make sure pm2 is installed and that the environment is set correctly
```
sudo npm install pm2 -g
export NODE_ENV=production/dev
```

Start the main app:
```
cd ~/clima-app/clima
pm2 start index.js --name "clima"
```

Start TileStream (note that we have to pass the arguments after "--"):
```
cd ~/clima-app/tilestream-clima
export MBTILES_PATH=...
pm2 start index.js --name "tilestream-clima" -- --tiles=$MBTILES_PATH --tilePort=8001
```

Start TileMill:
```
cd ~/clima-app/tilemill-clima
pm2 start index.js --name "tilemill-clima" -- --server=true
```

