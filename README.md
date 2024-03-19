# Statistics Web App

This is a sample web application developed to provide statistical analysis on Tabular Data, RGB images and Text.

## Project Structure

* The root directory contains the client and flask-server directories as well as  this README file and the docker-compose file to orchasterate the dockerization between the client and the server.

* The flask-server directory which contains its own Dockerfile and the server.py which launches our backend API.

* The client directory which contains its own Dockerfile and the frontend files and  /client/src/index.js which launches our client service.

## Methodology

The project is broken into two parts the server which is developed using flask and the client which is developed using react.js the development took part in a virtual environment on an ubuntu 18 machine.

### The Server

The backend API was designed first it took approximately 4 hours which includes (research , coding and testing). In addition PIL was used to process the images and prepare the histograms, and gensim was used to load the TSNE model.

### The Client 

The frontend took approximaetly 6 hours which includes (designing, coding, integrating with the backend and testing). In addition to React.js which was the main framework used for the client, Tailwindcss was also used for styling as it is light weight and works right out of the box, Axios was used to act as a promise-based HTTP Client and minor libraries were used for visualization notebly chartJS to plot the color histogram and d3 for the TSNE word vectors.

### Dockerization

Indiviual containers were made for the frontend and the backend then composed together this step took approximately 1 hours

### Deployment

For deployment the container can be deployed on AWS ECS:

* Create and Set up your first run with Amazon ECS.

* Create/Upload container and task definition.

* Define number of copies of each container.

* Launch your cluster.

* Additionally you can view the resources on the status page of the cluster.

* Additionally a Domain name server can be bought and linked to re-direct traffic.


# Running the code locally

Assuming Docker is already installed on the machine...run the following commands in the project root directory:

* docker-compose build
* docker-compose up 
* then go to http://localhost:3000