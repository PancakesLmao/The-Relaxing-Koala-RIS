#!/bin/bash
server_address=$(cat ../server_address)
curl --no-progress-meter\
	--header "Content-Type: application/json" \
	--request GET \
	$server_address/reservations/get-all-reservations
