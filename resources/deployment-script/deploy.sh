#!/bin/bash

##
#	Bash script to fetch Wild application from repository and run.
##

#Clone project from git.
echo "Clonning project from git"
cd ..
rm -rf ./Spring2017Swe573-BRK
git clone git@github.com:bulentrahimkazanci/Spring2017Swe573-BRK.git
echo "Clonning finished"
cd ./Spring2017Swe573-BRK/wild-app

#Install dependencies.
npm install
echo "Installed dependencies"

#Change key files
cp ../../keyz/config.ts ./
cp ../../keyz/keyz.json ../
echo "Copying key production files"

#Build frontend side.
echo "Building Angular application"
ng build
echo "Finished building Angular application"

#Run web app.
pm2 start server.js