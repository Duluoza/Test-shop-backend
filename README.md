## Description

Backend for Shop.

## Installation

```bash
$ git pull
```

## Running the app

```bash
# run bash script
$ bash start.sh

or

# run commands of docker
$ docker build -t shop-back .
$ docker-compose up
```

## Details

# Endpoints and Available roles

/products/findAll - seller, cashier, accountant

​/order​/create  - cashier

​/order​/findOne - seller

​/order​/findAll - accountant , (format Date for From and To: 2021-01-27 or 2021-01-27T11:30)

​/order​/update - seller, cashier

/bill/generate - cashier

http://localhost:5000/api/ - Link for Swagger when the application is running

## Tokens

Кассир - cashier 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjEyMzQ1Njdhc2QiLCJyb2xlcyI6WyJjYXNoaWVyIl0sImVtYWlsIjoi0YFhc2hpZXJAcm9vdC5jb20iLCJ1c2VyTmFtZSI6IkRlbiJ9fQ.SrI-_y8kTHDlssELwogwoxWDy1tRT6fzToxGmFptRY0

Бухгалтер - accountant
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjEyMzQ1NjdmZ2giLCJyb2xlcyI6WyJhY2NvdW50YW50Il0sImVtYWlsIjoiYWNjb3VudGFudEByb290LmNvbSIsInVzZXJOYW1lIjoiTWF4In19.CnbIQyb3fn5POytb-CI_I_Evw9ihLN8f9Riy35Nk6iI

Продавец-консультант - seller
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjEyMzQ1Njdqa2wiLCJyb2xlcyI6WyJzZWxsZXIiXSwiZW1haWwiOiJzZWxsZXJAcm9vdC5jb20iLCJ1c2VyTmFtZSI6IkFseW9uYSJ9fQ.dxTiTGlGN9c1epCvzN_X-wTzXkvhDvUpo4S9H1K1SEc

## Link to import Postman collection
https://www.getpostman.com/collections/40acb9dd2a55de8e6e58