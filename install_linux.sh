echo "Installing Ubuntu dependencies"
curl -sL https://deb.nodesource.com/setup_11.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs