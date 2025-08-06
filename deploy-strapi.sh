#!/bin/bash
set -euo pipefail

# ✅ Sesuaikan variabel ini:
DOMAIN="admin-energi.juno-tosho.xyz"
REPO_URL="https://github.com/thomasnkurniawan/sedekah-energi-admin.git"
APP_DIR="/var/www/strapi"
MYSQL_DB="sedekah_energi"
MYSQL_USER="energi_user"
MYSQL_PASS="sedekahenergi123"
EMAIL="tomisedunia@gmail.com"  # Email untuk Let's Encrypt

echo "🚀 Starting deployment to $DOMAIN..."

# 1. Update & install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx mysql-server certbot python3-certbot-nginx build-essential

# 2. Setup firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 3. Install NVM & Node.js
echo "📦 Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

export PROVIDED_VERSION="lts/*"
export LANG=C.UTF-8
export LC_ALL=C.UTF-8

echo "📦 Installing Node.js v22.18.0..."
nvm install 22.18.0
nvm alias default 22.18.0

# 4. Install PM2
npm install -g pm2

# 5. Setup MySQL
echo "💾 Configuring MySQL..."
sudo systemctl start mysql
sudo mysql -e "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DB\`;"
sudo mysql -e "CREATE USER IF NOT EXISTS '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASS';"
sudo mysql -e "GRANT ALL PRIVILEGES ON \`$MYSQL_DB\`.* TO '$MYSQL_USER'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# 6. Clone project
echo "📁 Cloning repo..."
sudo rm -rf "$APP_DIR"
git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"

# 7. Install dependencies & build Strapi
echo "🔧 Installing dependencies..."
npm install

echo "🔐 Generating .env.production..."
cat <<EOF > .env.production
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=$(openssl rand -hex 32),$(openssl rand -hex 32)
API_TOKEN_SALT=$(openssl rand -hex 32)
ADMIN_JWT_SECRET=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
DATABASE_CLIENT=mysql
DATABASE_NAME=$MYSQL_DB
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=$MYSQL_USER
DATABASE_PASSWORD=$MYSQL_PASS
DATABASE_SSL=false
EOF

echo "🏗️ Building Strapi..."
npm run build

# 8. Run via PM2
echo "🚀 Starting Strapi with PM2..."
pm2 start npm --name strapi -- run start
pm2 startup
pm2 save

# 9. Setup Nginx
echo "🌐 Configuring Nginx..."
sudo bash -c "cat > /etc/nginx/sites-available/$DOMAIN" <<EOL
server {
  listen 80;
  server_name $DOMAIN;

  location / {
    proxy_pass http://127.0.0.1:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
  }

  access_log /var/log/nginx/$DOMAIN.access.log;
  error_log /var/log/nginx/$DOMAIN.error.log;
}
EOL

sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 10. Install SSL dengan Let's Encrypt
echo "🔒 Setting up SSL..."
sudo certbot --nginx -d $DOMAIN --redirect --agree-tos --no-eff-email -m $EMAIL

echo "✅ Deployment complete! Strapi is live at https://$DOMAIN"
