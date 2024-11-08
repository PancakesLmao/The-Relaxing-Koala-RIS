#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [order_item_id]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter \
	--header "Content-Type: application/json" \
	--request DELETE \
	--data '{"order_item_id":"'$1'"}' \
	$server_address/orders/remove-order-item
