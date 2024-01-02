## Require

| Application    | Version  |
| -------------- | -------- |
| Windows        | v22H2    |
| Node           | v20.10.0 |
| Docker         | v24.0.2  |
| docker-compose | v2.18.1  |
| VS Code        | v1.83.0  |
| Git            | v2.41.0  |

## Install

1. Clone repository:
  ```bash
  git clone git@github.com:ooodepa/dp_backend.git
  cd dp_backend
  ```
1. Install node modules:
  ```bash
  yarn
  ```


## Run database

1. Copy env file
  ```
  cp .env.example .env
  ```
1. Start docker containers
  ```
  docker-compose up
  ```

## Run NodeJS

1. Copy env file
  ```
  cp .env.example .env
  ```
1. Start application
  ```
  yarn start:dev
  ```
