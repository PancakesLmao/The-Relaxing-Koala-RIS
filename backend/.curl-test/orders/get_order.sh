#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [order_id]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --header "Content-Type: application/json" \
	--request GET \
	--data '{"order_id":"'$1'"}' \
	$server_address/orders/get-order
