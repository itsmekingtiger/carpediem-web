#! /bin/sh

BASE_DOWNLOAD_URL="https://github.com/itsmekingtiger/carpediem-web/releases"
DEFAULT_DOWNLOAD_URL=$BASE_DOWNLOAD_URL"/latest"

VERSION_TAG=$1

if [ -z "$VERSION_TAG" ]; then
	DOWNLOAD_URL=$DEFAULT_DOWNLOAD_URL
else
	DOWNLOAD_URL=$BASE_DOWNLOAD_URL"/tag/"$VERSION_TAG
fi

echo ">" download web site from: $DOWNLOAD_URL

STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" $DOWNLOAD_URL)


if []:

echo $STATUS_CODE