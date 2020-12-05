FROM node:15.3.0-alpine3.10 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:15.3.0-alpine3.10
WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN yarn install --only=production

ENTRYPOINT [ "yarn", "start" ]