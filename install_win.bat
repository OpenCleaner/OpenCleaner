echo "Installing windows dependencies"
choco install nodejs
refreshenv
echo "Running on node version"
node --version