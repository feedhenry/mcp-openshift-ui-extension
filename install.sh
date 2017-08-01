#!/bin/sh

set -x
set -e

# What platform are we running on?
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    *)          echo "Unknown uname ${unameOut}. Must be Linux or Darwin. Exiting"
esac

# Get location of master-config.yaml
#OPENSHIFT_CONFIG_DIR=`docker inspect -f '{{range .Mounts}}{{if eq .Destination "/var/lib/origin/openshift.local.config"}}{{.Source}}{{end}}{{end}}' origin`
OPENSHIFT_CONFIG_DIR=$PWD
# if [[ -z "$OPENSHIFT_CONFIG_DIR" ]]; then
#   echo "OPENSHIFT_CONFIG_DIR could not be determined. Is a local oc cluster running?"
#   exit 1;
# fi
OPENSHIFT_MASTER_CONFIG=$OPENSHIFT_CONFIG_DIR/master/master-config.yaml
MCP_BASE_DIR=$OPENSHIFT_CONFIG_DIR

# Download yaml cli if not already installed
if hash yaml 2>/dev/null; then
  echo 'yaml already installed.'
else
  if [ "$machine" == "Darwin" ]; then
    yaml_download_url=https://github.com/mikefarah/yaml/releases/download/1.11/yaml_darwin_amd64
  elif [ "$machine" == "Linux" ]; then
    yaml_download_url=https://github.com/mikefarah/yaml/releases/download/1.11/yaml_linux_amd64
  fi
  sudo curl -J -L $yaml_download_url -o /usr/bin/yaml
  sudo chmod +x /usr/bin/yaml
fi

# Enable Extension Development
sudo chmod 666 $OPENSHIFT_MASTER_CONFIG
node update_master_config.js $OPENSHIFT_MASTER_CONFIG
sudo chmod 644 $OPENSHIFT_MASTER_CONFIG

# Restart openshift
docker restart origin