@echo off

cd ./control
npm install --no-audit --silent
npm audit --prod
cd ../

call dotnet build ./solution -c Release
