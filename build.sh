#!/bin/sh

npm install --prefix ./control --no-audit --silent
npm audit --prefix ./control --prod

dotnet build ./solution -c Release
