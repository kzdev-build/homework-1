# Task
Write an API that will be queried by two services: the Stuart API and the Dispatcher.

The Stuart API will need to keep in sync the list of Couriers in the platform as well as their max capacity (in liters).

The Dispatcher will need to query this API to find out which couriers do have available space.

--- 
<b>Please note</b> 
From my understanding, the max_capacity behaves more as the current capacity of the courier.

If I have to reframe I would go with this defition:
```
{
  id: string
  current_capacity: number
  max_capacity: number
}
```

but to follow the task I'm going to use this: 
```
{
  id: string
  max_capacity: number
}
```

## How do we run this API?
Option 1 - Locally

```bash
npm i -g @nestjs/cli
npm install
npm start
```

<br>
Option 2 - Using Docker

`docker-compose up --build`

<br>
Once everything is up go to 
[http://localhost:3000/api](http://localhost:3000/api) , you will find a Swagger client.

<br>

## How to run Tests

```bash
npm run test # unit test 
npm run test:cov # code coverage
```

To see the coverage report go to: `./coverage/lcov-report/index.html`

<br>

## Extra points
[x] Courier capacities vary as they pick and deliver packages. Allow the API to update a courier's available capacity at any moment as they are assigned new packages.

[x] We plan to run this service in the AWS environment. Prepare this API to be deployed 
- Dockerfile definition
- Build CI/CD pipeline to run all tests, build a new image and then deploy.  

Please note: Right now the information are stored into the courier service - Use postgresql or something similar.

