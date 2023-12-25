# Sync Github and Bitbucket

Our development environment is managed by Myplanet so we use Myplanet's Github and Vercel instances.

But the staging and production environments are managed by Cymax and use Cymax's Bitbucket and Vercel instances

Unfortunately Github and Bitbucket don't have a way of forking each other repos so we need to manually push the updates from Github to Bitbucket. Here's how to do it:

## Setup

Make sure you setup your ssh config to be able to read/write to the Bitbucket repo following this gist (you can skip the "Disconnect from github" section):
https://gist.github.com/marcos-moro/1845fa3cf208df73ec8cfe1c43855366

## Push changes

We'll always push the changes from the `main` branch from github to the `main` branch on bitbucket. That way we can do this process without triggering a deploy to staging or production.

Since your local will probably be connected to the Myplanet's Github repo you'll need to use the full git push command:
```shell
git push <remote_name> main:main
```
