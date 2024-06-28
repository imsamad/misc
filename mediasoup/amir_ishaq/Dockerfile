FROM ubuntu
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y pip 
RUN apt-get install -y net-tools
RUN apt-get install -y iputils-ping
RUN apt-get install -y iproute2 
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - 

RUN apt-get install -y nodejs
RUN npm install -g watchify

EXPOSE 3000
EXPOSE 2000-2020
EXPOSE 10000-10100