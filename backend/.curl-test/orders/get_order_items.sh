#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [order_id]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter \
	--header "Content-Type: application/json" \
	--request GET \
	$server_address/orders/get-order-items-from-id/$1
