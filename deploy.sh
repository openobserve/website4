#!/bin/sh

npm run generate --node-options="--max-old-space-size=8192"

# Move the files to S3 bucket for hosting
aws s3 sync ./.output/public s3://zincsearch-website/  --exclude=".git/*" --profile=prod

# invalidate cloudfront cache so that latest files can be served
aws cloudfront create-invalidation --distribution-id E3KB2JN7JA8U38 --paths="/*" --profile=prod
