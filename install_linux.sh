echo "Installing Ubuntu dependencies"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
sudo bash nvm_install.sh
nvm install node
echo "Running on node version"
node --version