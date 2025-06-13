#!/bin/bash

# Run the following command to uninstall all conflicting packages:
apt-get update -y

# Use Docker script from script library to set things up - enable non-root docker, user vscode, using moby
sudo /bin/bash ./docker-in-docker-debian.sh "true" "automatic" "true"
sudo apt-get install -y docker-model-plugin

# Clean up
apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# TODO: Uncomment the following when Foundy Local is available for Linux
# See https://github.com/microsoft/Foundry-Local/discussions/82
# echo Preparing Foundry Local environment...
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# echo >> /home/vscode/.bashrc
# echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/vscode/.bashrc
# eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
# brew install --build-from-source glibc
# brew tap microsoft/foundrylocal
# brew install foundrylocal

echo Done!
