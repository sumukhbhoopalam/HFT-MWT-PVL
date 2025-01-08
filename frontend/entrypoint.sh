#!/bin/sh

# Generate the config.json file with runtime environment variables
echo "Creating runtime configuration file..."

cat > /usr/share/nginx/html/config.json <<EOL
{
  "REACT_APP_BACKEND_URL": "${REACT_APP_BACKEND_URL:-http://localhost:5000}"
}
EOL

echo "Runtime configuration file created:"
cat /usr/share/nginx/html/config.json

# Start Nginx
exec "$@"