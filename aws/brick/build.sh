#!/bin/bash

# "set -e" makes it so if any step fails, the script aborts:
set -e

cd "${BASH_SOURCE%/*}"

# Build Lambda package
rm -rf build
mkdir build
cd ../..
cp -r app.js config.js lib locales package-lock.json package.json public routes views aws/brick/build
cd aws/brick/build
cp ../../src/* .
npm install
npm install aws-serverless-express
cd ../build
zip -r ../lambda.zip .