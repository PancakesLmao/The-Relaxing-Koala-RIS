#!/bin/bash
if [ $# -lt 4 ]; then
	echo "must have 4 args [order_id] [note] [menu_item_id] [quantity]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --header "Content-Type: application/json" \
	--request PUT \
	--data '[
		{"order_id":"'$1'", "note":"'$2'", "menu_item_id":"'$3'","quantity":"'$4'"},
		{"order_id":"'$1'", "note":"'$2'", "menu_item_id":"'$3'","quantity":"'$4'"},
		{"order_id":"'$1'", "note":"'$2'", "menu_item_id":"'$3'","quantity":"'$4'"},
		{"order_id":"'$1'", "note":"'$2'", "menu_item_id":"'$3'","quantity":"'$4'"},
		{"order_id":"'$1'", "note":"'$2'", "menu_item_id":"'$3'","quantity":"'$4'"}
	]' \
	$server_address/orders/add-order-items
