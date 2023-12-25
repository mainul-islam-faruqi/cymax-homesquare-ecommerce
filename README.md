# Cymax Project

Next.js Application.

## Get Started

Clone the repo and install dependencies 

```
yarn install
```

Start dev server

```
yarn dev
```

Then, navigate to [localhost:3000](http://localhost:3000)

## Stack

- [Next.js](https://nextjs.org/docs/getting-started)
- [React-Query](https://react-query.tanstack.com/)
- [Chakra-UI](https://chakra-ui.com/docs/getting-started)

# Doc List

- [Contentful migrations](./docs/contentfulMigrations.md)
- [Bitbucket sync](./docs/bitbucketSync.md)
- [Environment variables](.envVars.md)

## Contentful

Contentful is a powerful content management system that makes it easy to manage and migrate your content. The process of setting up content migrations with Contentful is simple and intuitive. First, you will need to create an account with Contentful. Inside the Contentful Dashboard you will have some of the variables needed to be added inside the environment variables file of this project.

The content models, which define the structure of your content are set up, you can generate using [contentful-migrate](https://www.npmjs.com/package/contentful-migrate) library.

Additionally, you can set up multiple environments, such as a development environment and a production environment, which allows you to make changes to your content and test them out before deploying them to your live site.

#### Preview

- CONTENTFUL_PREVIEW_SECRET (contentful preview secret - available inside contentful dashboard)
- NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN (contentful access token - available inside contentful dashboard)

#### Development

- CONTENTFUL_MANAGEMENT_ACCESS_TOKEN (contentful user access token to modify data - available inside contentful dashboard)
- CONTENTFUL_MIGRATIONS_DIR (directory where migrations are inside the project for [contentful-migrate](https://www.npmjs.com/package/contentful-migrate) library runs the commands)

### Contentful Migrations Commands

#### 1. List Migration

```
yarn migration-list -c <content_type_name>
```

#### 2. Create Migration

```
yarn migration-create -c <content_type_name> <name_for_migration>
```

_This creates a folder `/migrations/<content_type_name>/<migration_file.js>` in the root of the project with your migration file inside. The `<migration_file.js>` file inside the folder should be moved to `/src/modules/app/contentful/migrations/<content_type_name> ` and the folder created can be safely deleted._

#### 3. Execute Migration

```
yarn migration-up -c <content_type>
```

