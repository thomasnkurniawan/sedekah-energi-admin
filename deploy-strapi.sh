#!/bin/bash
# ====================================
# Deploy Strapi ke VPS (Production)
# ====================================

APP_NAME="strapi-admin"
APP_DIR="/var/www/$APP_NAME"
GIT_REPO="https://github.com/thomasnkurniawan/sedekah-energi-admin.git"
NODE_ENV="production"
DOMAIN="admin-sedekahenergi.mosaic-indonesia.com"
PM2_NAME="strapi-admin"

DB_NAME="sedekahenergi"
DB_USER="energi"
DB_PASS="energisedekah123"

echo "🚀 Starting Strapi deployment..."

# 0️⃣ Create MySQL database & user
echo "🗄 Creating MySQL database & user if not exists..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;"
mysql -u root -p -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

# 1️⃣ Clone project (kalau belum ada)
if [ ! -d "$APP_DIR" ]; then
    echo "📂 Cloning repository..."
    git clone $GIT_REPO $APP_DIR
else
    echo "📂 Pulling latest changes..."
    cd $APP_DIR
    git reset --hard
    git pull origin main
fi

cd $APP_DIR

# 2️⃣ Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# 3️⃣ Build admin panel
echo "🏗 Building admin panel..."
npm run build

# 4️⃣ Setup environment file
echo "⚙️ Setting environment variables..."
cat > .env <<EOL
NODE_ENV=production
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=${DB_NAME}
DATABASE_USERNAME=${DB_USER}
DATABASE_PASSWORD=${DB_PASS}
APP_KEYS=$(openssl rand -hex 16),$(openssl rand -hex 16)
API_TOKEN_SALT=$(openssl rand -hex 16)
ADMIN_JWT_SECRET=$(openssl rand -hex 16)
JWT_SECRET=$(openssl rand -hex 16)
EOL

# 5️⃣ Restart pm2 process
echo "🔄 Restarting PM2..."
pm2 stop $PM2_NAME || true
pm2 start npm --name $PM2_NAME -- run start
pm2 save

# 6️⃣ Nginx config
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
echo "🌐 Setting up Nginx..."
sudo tee $NGINX_CONF > /dev/null <<EOF
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
}
EOF

sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/$APP_NAME
sudo nginx -t && sudo systemctl reload nginx

# 7️⃣ (Optional) Setup SSL
echo "🔐 Setting up SSL with certbot..."
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

echo "✅ Deployment completed! Visit https://$DOMAIN"
