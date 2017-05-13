#!/bin/bash

##
#	Bash script to make required configurations on server in order to run Wild application.
##

# Install Node.js.
echo "Installing Node.js!"
sudo sh -c 'echo "Got Root!"'

echo "Get Latest Version Number..."
{
	wget --output-document=node-updater.html https://nodejs.org/dist/latest/

	ARCH=$(uname -m)

	if [ $ARCH = x86_64 ]
	then
		grep -o '>node-v.*-linux-x64.tar.gz' node-updater.html > node-cache.txt 2>&1

		VER=$(grep -o 'node-v.*-linux-x64.tar.gz' node-cache.txt)
	else
		grep -o '>node-v.*-linux-x86.tar.gz' node-updater.html > node-cache.txt 2>&1

		VER=$(grep -o 'node-v.*-linux-x86.tar.gz' node-cache.txt)
	fi

	rm ./node-cache.txt
	rm ./node-updater.html
} &> /dev/null

echo "Done"
DIR=$( cd "$( dirname $0 )" && pwd )

echo "Downloading latest stable Version $VER..."
{
	wget https://nodejs.org/dist/latest/$VER -O $DIR/$VER
} &> /dev/null

echo "Done"
echo "Installing..."

cd /usr/local && sudo tar --strip-components 1 -xzf $DIR/$VER
rm $DIR/$VER

echo "Finished installing Node.js!"

# Install npm.
echo "Installing NPM"
sudo apt-get install npm
echo "Finished installing NPM"

# Install Git.
echo "Installing Git"
sudo apt-get install git
echo "Finished installing Git"

#Install Nginx.
echo "Instaling Nginx"
sudo apt-get install nginx
echo "Finished installing Nginx"

# Install PM2.
echo "Installing PM2"
sudo npm install pm2 -g
echo "Finished installing PM2"

# Install angular commandline interface.
echo "Installing Angular CLI"
npm install -g @angular/cli
echo "Finished installing Angular CLI"


# Set permissions
chmod 700 ~/.ssh/id_rsa

# Run Nginx as deamon.
sudo service nginx start
