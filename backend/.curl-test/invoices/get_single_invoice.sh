#!/bin/bash
if [ $# -lt 1 ]; then
	echo "must have 1 arg [order_id]"
	exit 1
fi
server_address=$(cat ../server_address)
curl --no-progress-meter \
	$server_address/invoices/get-single-invoice/$1
