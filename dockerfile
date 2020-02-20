#############
### build ###
#############

# base image
FROM node:12.14.1

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /frontend/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.21

# add app
COPY . /frontend

# build app
RUN ng build --prod --aot

############
### prod ###
############

# base image
FROM nginx:1.17.8-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
