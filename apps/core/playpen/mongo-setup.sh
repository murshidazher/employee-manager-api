#!/bin/bash
echo "sleeping for 4 seconds"
sleep 4

echo mongo-setup.sh time now: `date +"%T" `
echo "initialize the replicaSet"
mongosh --host mongo1:27017 <<EOF
  var cfg = {
    "_id": "rs0",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo1:27017",
        "priority": 2
      }
    ]
  };
  rs.initiate(cfg);
EOF
