#!/bin/bash

ECR_REGISTRY=$1
ECR_REPOSITORY=$2
FRONTEND_IMAGE_TAG=$3
BACKEND_IMAGE_TAG=$4

# Login to ECR
$(aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY)

# Pull the latest images
docker pull $ECR_REGISTRY/$ECR_REPOSITORY:$FRONTEND_IMAGE_TAG
docker pull $ECR_REGISTRY/$ECR_REPOSITORY:$BACKEND_IMAGE_TAG

# Stop and remove old containers
docker rm -f frontend backend

# Run new containers
docker run -d -p 3000:3000 --name frontend $ECR_REGISTRY/$ECR_REPOSITORY:$FRONTEND_IMAGE_TAG
docker run -d -p 3005:3005 --name backend $ECR_REGISTRY/$ECR_REPOSITORY:$BACKEND_IMAGE_TAG
