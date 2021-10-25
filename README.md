# This Is The Gwei

**This Is The Gwei** is a utility for viewing Ethereum gas fees.

Gas fees are required to execute transactions on the Ethereum network. Gas fees fluctuate and are generally related to the amount of activity on the network. 
You can read more about gas and fees on the official Ethereum developer documentation [here](https://ethereum.org/en/developers/docs/gas/). 

**This Is The Gwei** helps developers and users to make more informed choices by storing gas fee data over time by enabling them to see current gas fees, as well as the average gas fee over a chosen time interval.

## Tech

**This Is The Gwei** utilizes:


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
> The free account tier will work just fine; **This Is The Gwei** is designed to abide by all Etherscan API rate limits.

## Installation

Open a terminal and navigate to a working directory where you would like the application to live, then clone this repo:
```shell
$ git clone https://github.com/elandsma/ThisIsTheGwei
```

Then, open up the .env file and replace `YOUR-API-KEY-HERE` with your own unique API key from Etherscan (no quotation marks around the API key - simply replace the text). Be careful not to edit anything else in this file aside from this line. The line should look *similar* to this:


```
ETHERSCAN_APIKEY = WYRTGXZ57HKLCA7F3HDVLEKSG32PHLER04
```


Now, in the terminal, run the following command:
```sh
$ docker-compose up
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
$ curl http://localhost:3000
```

If you are deploying the application on a cloud server, simply replace `localhost` with the appropriate IP address or domain.



## Usage

Upon start, the application will immediately begin querying the Etherscan API every 5 seconds and storing novel gas fee data into the local database. The data will remain persistent in the database for as long as the Docker container lives. That is to say, if you shut down and restart the Docker container, the data will persist; however if you *remove* the image instance, the data from that image will be lost. If you wish to have a clean slate, you may run ```docker-compose down``` to remove the images and their associated data.



## API
The following endpoints are available for use:

##########
```
GET "/gas"
```

Returns a JSON object showing the most recent gas price in the database at three tiers (fast, average, low), the associated block number, and the time this data was added to the database (in Unix timestamp format).

Sample return: 

```
{"Error":false,"Message":{"FastGasPrice":85,"AverageGasPrice":84,"LowGasPrice":84,"UnixTime":1635129704067,"BlockNum":13483952}}
```

##########
```
GET "/average?fromTime=&toTime="
```

Returns a JSON object showing the average gas price in the time interval between fromTime and toTime, inclusive, in Unix timestamp format. The return also shows the number of data points used to calculate this average so the user can make a judgement on how significant the data is.
The reponse object will display the fromTime and the toTime as the earliest and latest datapoints used to make the calculation, as opposed to returning back the given parameters, in order to more accurately reflect the data.  

Sample return: 

```
{"Error":false,"Message":{"averageGasPrice":70.0625,"fromTime":1635129443719,"toTime":1635129759102,"pricesUsedToCalculateAverage":16}}
```


The average price is returned in Gwei units, and the number will round to a *maximum* of 9 decimal places, where applicable. In other words, the average may be given down to maximum precision of 1 Wei. 



## Development Notes

### Motivation
This application was built for a technical assessment, as consideration of my candidacy for an internship position.

### Technology choices:

MongoDB was chosen as the database because of its simplicity, as we are not dealing with relational data.

Etherscan was chosen as the external API for our price data, due to the response speed and rate limits, both of which made it a superior choice when compared against other similar options. 

"This Is The Gwei" is a play on the phrase "This Is The Way" from [The Mandalorian](https://en.wikipedia.org/wiki/The_Mandalorian). 

### Future Considerations:

If I had more time to keep developing this, I would:


- [ ] Use Typescript. I don't have much experience with typescript but I am eager to learn, because type errors are a leading cause of bugs in JavaScript.
- [ ] Implement unit testing (Maybe using [Mocha](https://mochajs.org/))
- [ ] Develop a front-end that enables users to access the data via an intuitive and easy-to-use UI if they prefer.
- [ ] Add logging to files instead of just sending everything to console.log, perhaps using a library such as [Winston](https://github.com/winstonjs/winston)

## License

**This Is The Gwei** is published on GitHub with an MIT license. 