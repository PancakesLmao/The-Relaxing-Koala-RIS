#!/bin/bash
if [ $# -lt 2 ]; then
	echo "must have 2 args [number] [cap]"
	exit 1
fi

curl -F table_number=$1 -F table_capacity=$2 http://127.0.0.1:8000/tables/add-table
