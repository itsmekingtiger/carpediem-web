#! /bin/sh

BASE_DOWNLOAD_URL="https://github.com/itsmekingtiger/carpediem-web/releases"
DEFAULT_DOWNLOAD_URL= BASE_DOWNLOAD_URL + "/latest"

if [ -z "$DOWNLOAD_URL" ]; then
	DOWNLOAD_URL="$DEFAULT_DOWNLOAD_URL"
fi

echo "download web site from 'DEFAULT_DOWNLOAD_URL'"

wget $DEFAULT_DOWNLOAD_URL -o=/tmp
tar -zxvf  /tmp/build.tar.gz -C /usr/local/bin