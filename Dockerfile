 FROM node:18-alpine

 WORKDIR /cruidapi

 COPY package*.json .

 RUN npm install
#copy executable path to container
 COPY . .
 #COPY packages* .json. /
 EXPOSE 3000
#cammand to run header filepack
 CMD ["npm", "start"]
