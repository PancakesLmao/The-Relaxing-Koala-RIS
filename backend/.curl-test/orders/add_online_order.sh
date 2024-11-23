#!/bin/bash
if [ $# -lt 4 ]; then
	echo "must have 4 args [customer_name] [menu_item_id] [quantity] [note]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --header "Content-Type: application/json" \
	--request PUT \
	--data '
	{
		"customer_name": "'$1'",
		"orders": [
		{
			"menu_item_id": "'$2'",
			"quantity": "'$3'",
			"note": "'$4'"
		},
		{
			"menu_item_id": "'$2'",
			"quantity": "'$3'",
			"note": "'$4'"
		},
		{
			"menu_item_id": "'$2'",
			"quantity": "'$3'",
			"note": "'$4'"
		},
		{
			"menu_item_id": "'$2'",
			"quantity": "'$3'",
			"note": "'$4'"
		}
		]
	}
	' \
	$server_address/orders/add-online-order
