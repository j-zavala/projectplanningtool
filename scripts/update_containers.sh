#!/bin/bash

# Login to ECR
$(aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY)

# Pull the latest images
docker pull $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
# docker pull $ECR_REGISTRY/$BACKEND_ECR_REPOSITORY:$IMAGE_TAG

# Stop and remove old containers
docker rm -f frontend backend

# Run new containers
docker run -d -e DATABASE_HOST=$DATABASE_HOST \
               -e DATABASE_PORT=5432 \
               -e DATABASE_USER=$DATABASE_USER \
               -e DATABASE_PASSWORD=$DATABASE_PASSWORD \
               -e DATABASE_NAME=$DATABASE_NAME \
               --name backend $ECR_REGISTRY/$BACKEND_ECR_REPOSITORY:$IMAGE_TAG

docker run -d -p 80:80 --name frontend $ECR_REGISTRY/$FRONTEND_ECR_REPOSITORY:$IMAGE_TAG
