#!/bin/bash
server_address=$(cat ../server_address)

if [ $# -lt 2 ]; then
	echo "needs 2 args [table_num] [order_id]"
	exit 1
fi

curl --no-progress-meter \
	--request PATCH \
	-H 'Content-Type: application/json'\
	-d '{"table_number":"'$1'", "customer_name":"'$2'"}'\
	$server_address/tables/add-order
