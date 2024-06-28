# Stage 1: Build
FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

RUN npm install -g serve
CMD ["serve", "-s", "build"]

