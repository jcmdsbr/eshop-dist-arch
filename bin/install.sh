#!/usr/bin/env bash

set -e

source bin/config

for i in "${services[@]}"; do
  cd "$HOME/src/services/$i"
  npm ci --silent
done