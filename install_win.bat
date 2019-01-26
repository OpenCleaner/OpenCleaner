echo "Installing windows dependencies"
powershell choco install nodejs
powershell choco install yarn
powershell refreshenv
echo "Running on node version"
powershell node --version