#!/bin/bash

# "set -e" makes it so if any step fails, the script aborts:
set -e

cd "${BASH_SOURCE%/*}"
source ./config.sh

AwsRegion=$(aws configure get region)
AwsAccountId=$(aws sts get-caller-identity --output text --query Account)

# Build Lambda package
rm -rf build
mkdir build
cd ..
cp -r app.js config.js lib locales package-lock.json package.json public routes views aws/build
cd aws/build
cp ../src/* .
npm install
npm install aws-serverless-express
cd ..

# Replace variables (Region and AccountId) in API Swagger template
cat api-swagger-template.json | sed -e "s/%Region%/${AwsRegion}/g" | sed -e "s/%AccountId%/${AwsAccountId}/g" | sed -e "s/%ApiTitle%/${StackName}/g"> api-swagger.json

# Package SAM template (loads Lambda dist zips to S3 locations)
aws cloudformation package \
	--template-file sam-template.json \
	--output-template-file sam-output.yml \
	--s3-bucket "${S3BucketArtifacts}" \
	--s3-prefix "${S3PrefixArtifacts}"

# Deploy CloudFormation stack
aws cloudformation deploy \
	--template-file sam-output.yml \
	--stack-name "${StackName}" \
	--capabilities CAPABILITY_IAM \
	--parameter-overrides \
	CommunityName="${CommunityName}" \
	SlackUrl="${SlackUrl}" \
	SlackChannel="${SlackChannel}" \
	SlackToken="${SlackToken}" \
	InviteToken="${InviteToken}" \
	RecaptchaSiteKey="${RecaptchaSiteKey}" \
	RecaptchaSecretKey="${RecaptchaSecretKey}" \
	Locale="${Locale}"

Url=$(aws cloudformation describe-stacks --stack-name ${StackName} | grep OutputValue | cut -f 4 -d'"')

echo
echo 'Deployed Slack Inviter!'
echo
echo "Account Id: ${AwsAccountId}"
echo "    Region: ${AwsRegion}"
echo "Stack Name: ${StackName}"
echo "       URL: ${Url}"
