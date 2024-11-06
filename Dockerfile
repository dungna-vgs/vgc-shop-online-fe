FROM nginx:latest

RUN apt update && \
    apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt install -y nodejs=18.20.* && \
    rm -rf /var/lib/apt/lists/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

RUN npm install -g pm2

CMD ["pm2-runtime", "start", "npm", "--", "start"]