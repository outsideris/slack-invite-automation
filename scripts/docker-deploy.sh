docker login -u $DOCKER_USER -p $DOCKER_PASS

docker build -t outsideris/slack-invite-automation:$TRAVIS_TAG .

docker tag outsideris/slack-invite-automation:$TRAVIS_TAG outsideris/slack-invite-automation:latest

docker push outsideris/slack-invite-automation:$TRAVIS_TAG
docker push outsideris/slack-invite-automation:latest
