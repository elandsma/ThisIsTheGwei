TODO:
-Logging
-Typescript?
-Dockerize
-Readme
-Postman Test File?

# This Is The Gwei

This Is The Gwei is a utility for viewing Ethereum gas fees.

Description of the problem and the solution.

NoGweiJose is a lorem ipsum etc etc

- Type some Markdown on the left
- ✨Magic ✨

## Features

- feature 1
- feature 2


## Tech

ThisIsTheGwei uses the following technologies/libraries/APIs:


- node.js - I/O backend
- Express - node.js network framework
- MongoDB - Chosen for simplicity because we are not handling relational data.
- [Mongoose](https://github.com/Automattic/mongoose) - MongoDB Object Modeling Tool
- [Docker] - containerization to reduce depencency isues.
- [Etherscan.io APIs](https://etherscan.io/) - Public API to retrieve gas prices.


## Requirements
The following are required for this application to run:

- [Docker](http://docker.com) 
- [Etherscan](https://etherscan.io/) API key. You can find out how to get one  at [https://docs.etherscan.io/getting-started/creating-an-account](https://docs.etherscan.io/getting-started/creating-an-account). The free account tier will work just fine - ThisIsTheGwei is designed to abide by the free tier rate limits.

## Installation

Open a terminal and navigate to a working directory where you would like the application to live., then clone this repo:
First, clone this repo:
```shell
git clone https://github.com/elandsma/ThisIsTheGwei
```

Then, open up the .env file and replace `Xyour_api_keyX` with your own unique API key from Etherscan (no quotation marks). 

Now, in the terminal, run:
```sh
docker-compose up
```



ThisIsTheGwei is deployed via Docker. By default, the Docker will expose port 3000. This can be changed in the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image by navigating to the root directory of the repo and running the following command directly from the root folder:

```
cd ThisIsTheGwei
docker-compose up
```

This can be done locally, or you can deploy the docker container to a cloud computing service.

Once the Docker image is built, the application will begin automatically. 

You can verify the deployment by navigating to your server address in
your browser:

```sh
localhost:8000
```

## Usage

Upon start, the application will immediately begin querying the Etherscan API, and storing gas fee data into the local database.
The data will remain persistent in the database for as long as the Docker container lives. That is, if you shut down and restart the Docker container, the data will persist. However, if you *remove* the image instance, the data from that image will be lost. 




The following endpoints are available for use:




Average Returns price is in Gwei. The number will round to a *maximum* of 9 decimal places, where applicable. In other words, the average may be given down to maximum precision of 1 Wei. 


## Development

This application was built for a technical assessment, as part of my candidacy for an internship position at a private company.

On technology choices:

MongoDB was chosen as the database because of it's simplicity, as we are not dealing with complicated relational data.

Etherscan was chosen as the external API due to the response speed and rate limits, which were both better than other options. 



If I had more time to keep developing this, I would:
Use Typscript
For the "/average" endpoint, I would place the lowest and highest timestamps that we calculated from into the response object. For instance, if we only had data from 10 to 20, and were queried for the average 5 to 25, the response object would show fromTime as 10 and toTime as 20, as opposed to showing that the average is from 5 to 25, because it misrepresents the data.



## License

MIT
