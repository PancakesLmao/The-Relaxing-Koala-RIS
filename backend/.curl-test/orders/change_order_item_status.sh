#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [order_item_id]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter \
	--header "Content-Type: application/json" \
	--request PATCH \
	$server_address/orders/change-order-item-status/$1
