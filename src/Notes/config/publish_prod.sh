#!/bin/sh
echo "${RED}PROD"
read -p 'Password: ' PASS_SERVER
NAME="base"
if [ "$1" != "i" ]
then
./mvnw clean
./mvnw package -Pprod
fi
CLIENT_PATH="./target/niopdc"$NAME"_0.0.2~SNAPSHOT_all.deb"
SERVER_PATH="/home/dpjadmin/niopdc_deb/ver_2.0.0/"$NAME".deb"
SERVER_IP="dpjadmin@172.17.66.13"
echo "copy file :" $CLIENT_PATH " to:" $SERVER_PATH
sshpass -p $PASS_SERVER scp $CLIENT_PATH $SERVER_IP":"$SERVER_PATH
sshpass -p $PASS_SERVER ssh $SERVER_IP "echo $PASS_SERVER | sudo -S dpkg -i $SERVER_PATH"

