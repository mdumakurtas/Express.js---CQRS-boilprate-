#!/bin/sh

# create .env file if it doesnt exists
if [ ! -f .env ]; then
  cp .env.example .env
fi
