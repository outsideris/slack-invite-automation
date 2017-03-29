#!/usr/bin/env bash

# Exit immediately if any commands return non-zero
set -e

# login to cloudfoundry
cf login -a https://api.system.staging.digital.gov.au -o $CF_ORG_PROD -s $CF_SPACE_PROD -u $CF_USER_PROD -p $CF_PASSWORD_PROD
cf target -o $CF_ORG_PROD -s $CF_SPACE_PROD

# set environment variables so NodeJS can access them
cf set-env join-govau-guides-develop COMMUNITY_NAME "$COMMUNITY_NAME" > /dev/null 2>&1
cf set-env join-govau-guides-develop SLACK_URL "$SLACK_URL" > /dev/null 2>&1
cf set-env join-govau-guides-develop SLACK_TOKEN "$SLACK_TOKEN" > /dev/null 2>&1
