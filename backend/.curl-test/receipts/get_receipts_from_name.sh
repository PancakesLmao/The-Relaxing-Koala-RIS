#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [name]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request GET \
	$server_address/receipts/get-receipts-from-name/$1
