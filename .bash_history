npx @nestjs/cli new dp_backend --directory ./ --package-manager yarn --language TypeScript


yarn
yarn add -D webpack@^5.0.0

yarn add @nestjs/config
yarn add cross-env
yarn add dotenv

yarn add @nestjs/typeorm
yarn add typeorm
yarn add -D @types/node
yarn add pg

yarn add @nestjs/swagger
yarn add swagger-ui-express
yarn add -D express

yarn add class-validator
yarn add class-transformer

yarn nest g res rest/api/v2/languages --no-spec
yarn migration-generate:dev src/migration/DP_CTL_Languages

yarn migration-generate:dev src/migration/DP_CTL_SitemapChangefreq
