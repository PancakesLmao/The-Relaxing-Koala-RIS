#!/bin/bash
if [ $# -lt 3 ]; then
	echo 'needs to have three variables [first name] [last name] [role]'
	exit 1
fi
curl -F first_name=$1 -F last_name=$2 -F role=$3 http://127.0.0.1:8000/staff/add-staff
exit 0
