FROM node:18 
WORKDIR /app
COPY package.json .
RUN npm install 
COPY prisma ./prisma/
COPY src ./src/
COPY index.js .

RUN npx prisma generate
RUN npx prisms migrate deploy
EXPOSE 3000
CMD ["node", "index.js"]
