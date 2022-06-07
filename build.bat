@echo off

@REM On windows, we can't rely on npm's "--prefix" option
cd ./control
npm install --no-audit --ignore-scripts --no-fund
npm audit --prod
cd ../

call dotnet build ./solution -c Release
