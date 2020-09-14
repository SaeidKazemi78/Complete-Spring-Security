#!/bin/sh
echo "${RED}DEV SERVER"
read -p 'Password: ' PASS_SERVER
NAME="gateway"
FULL_NAME="niopdc"$NAME"-0.0.2-SNAPSHOT.war"
FULL_NAME_SERVER="niopdc"$NAME".war"
if [ "$1" != "i" ]
then
./mvnw clean
./mvnw package -Pdev-server
fi
CLIENT_PATH="./target/"$FULL_NAME
SERVER_PATH="/var/sftp/uploads/"$FULL_NAME_SERVER
SERVER_IP="dpjadmin@172.17.75.3"
sleep 5
echo "copy file :" $CLIENT_PATH " to:" $SERVER_PATH
sshpass -p $PASS_SERVER scp $CLIENT_PATH $SERVER_IP":"$SERVER_PATH
sshpass -p $PASS_SERVER ssh $SERVER_IP "echo $PASS_SERVER | sudo -S cp $SERVER_PATH /var/niopdcapps/"
sshpass -p $PASS_SERVER ssh $SERVER_IP "echo $PASS_SERVER | sudo -S service niopdc$NAME restart"

