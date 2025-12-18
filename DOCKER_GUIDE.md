# Docker 部署指南 | Docker Deployment Guide

本文档详细说明如何将本项目打包成 Docker 镜像并发布到 Docker Hub。
This document details how to build this project into a Docker image and publish it to Docker Hub.

## 📋 目录 | Table of Contents

- [前置要求 | Prerequisites](#前置要求--prerequisites)
- [构建镜像 | Build Image](#构建镜像--build-image)
- [推送镜像 | Push Image](#推送镜像--push-image)
- [运行容器 | Run Container](#运行容器--run-container)

## 前置要求 | Prerequisites

- 已安装 [Docker](https://www.docker.com/get-started)
- 已注册 [Docker Hub](https://hub.docker.com/) 账号
- 项目根目录下已包含 `Dockerfile` 和 `nginx.conf`

## 构建镜像 | Build Image

1. **查看项目版本 | Check Project Version**
   查看 `package.json` 中的 `version` 字段。
   Check the `version` field in `package.json`.

2. **构建镜像 | Build Command**
   在项目根目录下运行以下命令（假设版本号为 1.3.2）：
   Run the following command in the project root (assuming version 1.3.2):

   ```bash
   docker build -t snake_p:1.3.2 .
   ```

## 推送镜像 | Push Image

1. **登录 Docker Hub | Login to Docker Hub**
   
   ```bash
   docker login
   ```
   输入您的 Docker Hub 用户名和密码（或 Access Token）。
   Enter your Docker Hub username and password (or Access Token).

2. **标记镜像 | Tag Image**
   将本地镜像标记为远程仓库格式。请将 `your_username` 替换为您的 Docker Hub 用户名。
   Tag the local image for the remote repository. Replace `your_username` with your Docker Hub username.

   ```bash
   # 格式: docker tag <本地镜像名>:<标签> <用户名>/<仓库名>:<标签>
   docker tag snake_p:1.3.2 your_username/snake_p:1.3.2
   ```

   例如 | Example:
   ```bash
   docker tag snake_p:1.3.2 haisheng666/snake_p:1.3.2
   ```

3. **推送镜像 | Push Command**

   ```bash
   docker push your_username/snake_p:1.3.2
   ```

   例如 | Example:
   ```bash
   docker push haisheng666/snake_p:1.3.2
   ```

## 运行容器 | Run Container

使用以下命令从 Docker Hub 拉取并运行镜像：
Use the following command to pull and run the image from Docker Hub:

```bash
# 格式: docker run -d -p <主机端口>:5001 --name <容器名称> <用户名>/<仓库名>:<标签>
docker run -dit -p 5001:5001 --name snake_p_c haisheng666/snake_p:1.3.2
```

- `-d`: 后台运行 | Run in background
- `-p 5001:5001`: 将主机的 5001 端口映射到容器的 5001 端口 | Map host port 5001 to container port 5001
- `--name snake_p_c`: 指定容器名称 | Specify container name

访问 `http://localhost:5001` 即可开始游戏！
Visit `http://localhost:5001` to start the game!
