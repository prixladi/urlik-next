#!/bin/sh

env
cp -v /configs/config.js /app/public/config.js

sed -i "s~API_URL~$API_URL~" /app/public/config.js
sed -i "s~URLIK_URL~$URLIK_URL~"/app/public/config.js
sed -i "s~AUTH_API_URL~$AUTH_API_URL~" /app/public/config.js
sed -i "s~AUTH_API_CLIENT_ID~$AUTH_API_CLIENT_ID~" /app/public/config.js
sed -i "s~GOOGLE_CLIENT_ID~$GOOGLE_CLIENT_ID~" /app/public/config.js

cat /app/public/html/config.js

echo "Starting app"
exec "$@"