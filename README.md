TODO:
- Logging
- Typescript?
- Readme
- Postman Test File?
- Licensing
- refactor /average to show fromTime as Lowest db entry
- 2 config files, or, place dev-defined variables in server.js file

# This Is The Gwei

This Is The Gwei is a utility for viewing Ethereum gas fees.

Description of the problem and the solution.

NoGweiJose is a lorem ipsum etc etc


## Features

- feature 1
- feature 2


## Tech

ThisIsTheGwei utilizes:


- [Node.js](https://github.com/nodejs/node) - JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - Node.js network framework
- [MongoDB](https://github.com/mongodb) - Document model database
- [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling tool
- [Docker](https://www.docker.com/) - Containerization to reduce depencency isues.
- [Etherscan.io APIs](https://etherscan.io/) - Public API to retrieve gas prices.


## Requirements
The following are required for this application to run:

- [Docker](http://docker.com) 
- [Etherscan](https://etherscan.io/) API key. 
>You can find out how to get an API key at [https://docs.etherscan.io/getting-started/creating-an-account](https://docs.etherscan.io/getting-started/creating-an-account).
>
> The free account tier will work just fine - ThisIsTheGwei is designed to abide by all Etherscan API rate limits.

## Installation

Open a terminal and navigate to a working directory where you would like the application to live, then clone this repo:
```shell
git clone https://github.com/elandsma/ThisIsTheGwei
```

Then, open up the .env file and replace `YOUR-API-KEY-HERE` with your own unique API key from Etherscan (no quotation marks around the API key - simply replace the text). Be careful not to edit anything else in this file aside from this line. The line should look *similar* to this:


```
ETHERSCAN_APIKEY = WYRTGXZ57HKLCA7F3HDVLEKSG32PHLER04
```


Now, in the terminal, run the following command:
```sh
docker-compose up
```

After Docker runs its magic✨, if all goes well you will see the following console messages:

```console
this_is_the_gwei_app  | Database Connection Established on mongodb://mongo:27017/this_is_the_gwei_app
this_is_the_gwei_app  | Server running on port 3000
```

 At this point, the application is usable and exposed on port 3000, so if you are running this locally, you may verify the deployment via the browser:

http://localhost:3000

Or via shell:
```sh
curl http://localhost:3000
```

If you are deploying the application on a cloud server, simply replace `localhost` with the appropriate IP address or domain.



## Usage

Upon start, the application will immediately begin querying the Etherscan API and storing gas fee data into the local database. The data will remain persistent in the database for as long as the Docker container lives. That is to say, if you shut down and restart the Docker container, the data will persist; however if you *remove* the image instance, the data from that image will be lost. If you wish to have a clean slate, you may run ```docker-compose down``` to remove the images and their associated data.



## API
The following endpoints are available for use:


URL
Params
Sample




Average Returns price is in Gwei. The number will round to a *maximum* of 9 decimal places, where applicable. In other words, the average may be given down to maximum precision of 1 Wei. 


## Development Notes

### Motivation
This application was built for a technical assessment, as consideration of my candidacy for an internship position at a private company.

### Technology choices:

MongoDB was chosen as the database because of its simplicity, as we are not dealing with relational data.

Etherscan was chosen as the external API for our price data, due to the response speed and rate limits, both of which made it a superios choice when compared against other similar options. 

"This Is The Gwei" is a play on the phrase "This Is The Way" from [The Mandalorian](https://en.wikipedia.org/wiki/The_Mandalorian). 

### Future Considerations:

If I had more time to keep developing this, I would:


- [ ] Use Typscript
- [ ] For the "/average" endpoint, I would place the lowest and highest timestamps that we calculated from into the response object. For instance, if we only had data from 10 to 20, and were queried for the average 5 to 25, the response object would show fromTime as 10 and toTime as 20, as opposed to showing that the average is from 5 to 25, because it misrepresents the data.
- [ ] Create formal unit tests
- [ ] Develop a front-end UI

## License

MIT
