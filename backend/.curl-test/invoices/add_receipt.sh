#!/bin/bash
if [ $# -lt 5 ]; then
	echo "must have 5 args [invoice_id] [order_id] [total] [method] [amount_given]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request PUT \
	--data '
	{"invoice_id":"'$1'","order_id":"'$2'","total":"'$3'","total_after_tax":"'$3'","payment_method":"'$4'","amount_given":"'$5'"}
	' \
	$server_address/invoices/add-receipt
