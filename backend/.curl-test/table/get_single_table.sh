#!/bin/bash
curl --no-progress-meter \
	--request GET \
	-H 'Content-Type: application/json'\
	-d '{"table_number":"'$1'"}'\
	http://127.0.0.1:8000/tables/get-single-table 
