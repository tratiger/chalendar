FROM node:22.16.0

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

RUN npm install -g npm@10.9.2

RUN npm install

# アプリケーションのソースをすべてコピー
COPY . .

CMD ["npm", "run", "dev"]

