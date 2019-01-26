echo "Installing windows dependencies"
choco install nodejs
choco install yarn
refreshenv
echo "Running on node version"
node --version