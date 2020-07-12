# FliqPay Test

This repository contains the solution to the FliqPay senior software engineering [test](https://docs.google.com/document/d/1sz_g5McxhBRze_VfK0QNWeN7J4BRuZzh0KZU6_bGyKo/edit)


# How to install

-   install [nodejs](https://nodejs.org/en/download/)

-   clone repository

-   run `npm install` && run `npm run start:dev`

-   navigate to local graphql [playground](http://localhost:5500/playground)

# Deployed instance 

This repository has been deployed with docker container on [heroku](https://fliqpay.herokuapp.com/) 

# Project Structure

```text
- build/ 
    build test

- src/
    Api/
        rest api contracts

    Database/entities
        MongoDB Entities

    GraphQL/
        Middlewares/
           graphql middle-wares     
          
        Modules/
            contains schemas & resolvers for app services
        
        Utils/
            GraphQL utilities
                interfaces, generate GQL schema typings, middlewares, custome GQL data typs
        
    Services/
        cache/
            Redis Connection
        
        connections
            establish and handle connection via typeorm to remote mongodb server

        constants/
            App Constants
        
        tickets/
            TicketServices create, comment, getTickets, disable tickets
    
        user_admin_schemas
            auth/
                Local, O-authentication services
    Test/
    
```

# Tools and Packages
