#!/bin/bash
if [ $# -lt 3 ]; then
	echo "must have 3 args [first_name] [last_name] [password]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request POST \
	--data '
	{
		"first_name": "'$1'",
		"last_name": "'$2'",
		"password": "'$3'"
	}
	' \
	$server_address/staff/login
