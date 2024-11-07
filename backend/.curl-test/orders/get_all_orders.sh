#!/bin/bash

server_address=$(cat ../server_address)
curl --header "Content-Type: application/json" \
	$server_address/orders/get-all-orders
