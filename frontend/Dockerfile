# # Use a smaller Node.js base image
# FROM node:18-slim

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to install dependencies first
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire project to the working directory
# COPY . .

# # Build the project (this runs `tsc -b` and `vite build` if in package.json)
# RUN npm run build

# # Expose Vite's default preview port
# EXPOSE 4173 5173

# # Command to run Vite in preview mode (production mode)
# CMD [ "npm", "run", "preview" ]

###########################################################



# better preferably use lowercase for naming,  and also have the AS in capital
# as it is a good practice, and also it is a convention
# main thing to focus is 
# 1. use multi stage build for vite
# 2. use alpine image for smaller image size
# 3. do not have any sort of errorrs or even warnings in the code
# that caused lots of errors in the build process and you'll be stuck there bruh!!
FROM node:18-alpine AS build_image

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


# multi stage build , one in npm, and then we are using the dist
# it also won't expose any of the code in teh container 
# as we only copy the build output from first stage hehe

FROM node:18-alpine

WORKDIR /app


# copying the dist, that is pehla stage's output bruh 
# got to know that they name stages too, woohooo
COPY --from=build_image /app/dist/ /app/dist/


COPY package*.json .

COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5173

CMD [ "npm", "run", "preview" ]




