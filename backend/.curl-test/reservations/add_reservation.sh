#!/bin/bash
if [ $# -lt 5 ]; then
	echo "must have 5 args [name] [phone] [notes] [table_number] [date_reserved]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request PUT \
	--data '
	{
		"customer_name":"'$1'",
		"customer_phone":"'$2'",
		"notes":"'$3'",
		"table_number":"'$4'",
		"date_reserved":"'$5'"
	}
	' \
	$server_address/reservations/add-reservation
