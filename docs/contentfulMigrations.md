# Contentful migrations

<a name="contentful-migrations"></a>

To keep track of Contentful Content Model we use Contentful Migrate Tool https://github.com/deluan/contentful-migrate

Here are the steps to use it:

1. Make sure you have all nessessary environment variables in your .env file.
   You need to have:

NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN - Contentful access token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT - Contentful environment name
NEXT_PUBLIC_CONTENTFUL_SPACE_ID - Contentful space id
CONTENTFUL_MANAGEMENT_ACCESS_TOKEN - Contentful management token
CONTENTFUL_MIGRATIONS_DIR=./src/modules/contentful/migrations - or some other path to your migration folder from the root, if you decide to keep this migration folder in the root of your project this environment variable is not needed

2. Run next command to create the content type 'Migration' into the designated contentful space. This will be used to keep track of the current state of each managed content type. You only need to do this once.

```
yarn migration-init
```

3. To add specific Content Types to your Contentful environment you can run:

```
yarn migration-up -c contentTypeName
```

or to add all existing Content Types

```
yarn migration-up -a
```

to test it before execution you can dry run it by adding -d or --dry-run to the end of the command.

4. If you already have some Content types created in the environment you can bootstrap it by running:

```
yarn migration-bootstrap -c contentTypeName
```

This will generate initial migration folder and file for choosen Content Type. If folder for this Content Type existed before, this will override its content.
You can also bootstrap all your Content Types in one go by changing -c contentTypeName to -a, however this will override the content of your migration folder.
In some cases there might be an error that has to do with a conflict with eslint. Potential solution is temporaraly remove eslint.

5. To create new migration run:

```
yarn migration-create fileName -c contentTypeName
```

There is also a small issue with the creation of new scripts using cli when migration folder is not in the root of the project. The tool does allow to have migration folder elsewhere in the project and for that you need CONTENTFUL_MIGRATIONS_DIR environment variable. This environment variable, however, is not taken in consideration when running a command to create a new script. The result is - it creates migration folder with the new script in the root of the project. The ticket to fix it has been open https://myplanet.jira.com/browse/CPD-860.

6. Lists all migrations for the given content-types or all Content Types, also indicating whether they were already applied and when.

```
yarn migration-list -c contentTypeName
```

or for all

```
yarn migration-list -a
```

7. There is also an option to migrate down to a specific version or just the last one if filename is not informed. This will roll back applied scripts for the specified content-type from the specified space. This can be error prone and is NOT RECOMMENDED.

```
yarn migration-down fileName -c contentTypeName
```
