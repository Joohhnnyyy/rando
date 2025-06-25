#!/bin/bash

# Upgrade pip, setuptools, and wheel
pip install --upgrade pip setuptools wheel

# Change to backend directory
cd backend

# Install requirements
pip install -r requirements.txt 