#!/bin/bash
if [ $# -lt 6 ]; then
	echo "must have 6 args [invoice_id] [order_id] [total] [method] [amount_given] [table_number]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request PUT \
	--data '
	{
		"invoice_id":"'$1'",
		"order_id":"'$2'",
		"total":"'$3'",
		"total_after_tax":"'$3'",
		"payment_method":"'$4'",
		"amount_given":"'$5'",
		"table_number":"'$6'"
	}
	' \
	$server_address/receipts/check-out
