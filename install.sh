# !/bin/bash
# Programa para ejecutar los contenedores

#Instalar mediante una imagen de node js
docker run --rm -v $(pwd):/home/node/app -w /home/node/app node:13-alpine npm install

#Desplegar docker-compose
docker-compose down

#Cambiar permisos
sudo chown -R $USER:$USER mongo_data/
sudo chown -R $USER:$USER rabbitmq_data/

# read -p "Ingrese el IP de la base de datos: " host
# read -p "Ingrese puerto: " port
# read -p "Ingrese el nombre de la base de datos: " database
# read -p "ingrese su usuario: " username
# echo -n "Ingrese su contraseña: ";
# read -s password

# echo "por favor ingrese la contraseña para sudo";
# sudo echo "Acceso a sudo confirmado";
 
#host=`cat $(pwd)/.env.dist.example`
#vhost=${vhost//@host@/$host}
#vhost=${vhost//@port@/$port}
#vhost=${vhost//@database@/$database}
#vhost=${vhost//@username@/$username}
#vhost=${vhost//@password@/$password}

#echo "$vhost" > "$(pwd)/.env.dist"

docker-compose up --build