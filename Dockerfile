FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 5173

CMD [ "npm","run", "preview" ]
