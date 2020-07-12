# FliqPay Test

This repository contains the solution to the FliqPay senior software engineering [test](https://docs.google.com/document/d/1sz_g5McxhBRze_VfK0QNWeN7J4BRuZzh0KZU6_bGyKo/edit)
<br>

Built with typescript, typeorm & graphql, this solution uses web-sockets, redis, & graphql subscriptions to create and comment 
on tickets in real time

# Project Documentation

GQ postman docs can be found [here](https://documenter.getpostman.com/view/10077490/T17NZjAq?version=latest)

# How to install

-   install [nodejs](https://nodejs.org/en/download/)

-   clone repository

-   run `npm install` && run `npm run start:dev`

-   navigate to local graphql [playground](http://localhost:5500/playground)

# Deployed instance 

This repository has been deployed with docker container on heroku [playground](https://fliqpay.herokuapp.com/playground) 

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

# Using Project

In [playground](https://fliqpay.herokuapp.com/playground) copy and paste queries from [Postman Docs](https://documenter.getpostman.com/view/10077490/T17NZjAq?version=latest) with 
variables to run operation, examples are defined below
for easy use. Users in example exist in the database.

**MongoDB UR**

mongodb://netbot:1234567890a@ds363098.mlab.com:63098/fpay-customer-service


**PlayGround Settings**

GraphQl playground does not include session + credentials from login by default, change setting to include credentials

![credentials](./doc/include-credentials.png)

**Mutations --Register**

![Reg](./doc/register.png)


```graphql endpoint doc
# QUERY
mutation register(
  $first_name: String!
  $last_name: String!
  $email: String!
  $role: Int!
  $password: String!
) {
  register(
    first_name: $first_name
    last_name: $last_name
    email: $email
    role: $role
    password: $password
  ) {
    ok
    message
    status
    error {
      path
      message
    }
  }
}

# QUERY VARIABLE

{
    "first_name": "Old", 
    "last_name": "ye", 
    "email": "griffinc317@gmail.com",
    "role": 2,
    "password": "1234567890"
}
```

**Mutations --Login**

![Login](./doc/login.png)

```graphql endpoint doc
# Query
mutation Login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        ok
        message
        status
        error {
            path
            message
        }
    }
}

# Query Variables
{
  "email" : "fcx06086@eoopy.com",
  "password": "1234567890"
}
```

**Subscription --Raise Ticket**

This is a ws channel, real time update of created tickets

![raise tickets](./doc/raised-tickets-subs.png)

The Raise ticket channel is restricted to admins, authentication via the token passed in as query variable 

![raise ticket](./doc/rts2.png)

```graphql endpoint doc
# Open channel for customers to post Tickets(requests/issues)
subscription {
  raisedTickets {
    id
    open
    request
    owner
    createdDate 
  }
}# Open channel for customers to post Tickets(requests/issues)
 subscription {
   raisedTickets {
     id
     open
     request
     owner
     createdDate 
   }
 }
```

**Subscription --Reply Ticket(s)**

This is a private ws channel, real time update of comments by admin(s) and ticket owner

![reply tickets](./doc/relpy-tickets-subs.png)


```graphql endpoint doc
# Private Channel fot replying tickets by admins & ticket owner
subscription {
  replyTicket(ticketId: "5f0ae0a9de02ba290cd5576d") {
    user_id
    full_name
    comment
    createdAt
    admin
  }
}
```

**Mutations --ReplyTickets**

Leave comments on a ticket, successfully comments on this mutation will be published to raisedTicket channels

![reply ticket](./doc/mutation-reply-ticket.png)

```graphql endpoint doc
# Reply a Ticket, Admin-User & Ticket-Owner restriction
mutation ReplyTicket($reply: String!, $id: String!) {
  replyTicket(reply: $reply, ticketId: $id) {
    ok
    message
    status
    error {
      path
      message
    }
  }
}


{
  "reply": "tested sub channels",
  "id": "5f0ae0a9de02ba290cd5576d"
}
```

**Mutations --RaiseTicket**

Raise ticket. only customer(s) can raise tickets.

![raise ticket](./doc/mutation-raise-ticket.png)


```graphql endpoint doc
# Raise a Ticket, Customer-User restriction
mutation RaiseTicket($request: String!) {
  raiseTicket(request: $request) {
    ok
    message
    status
    error {
      path
      message
    }
  }
}

# Query variables

{
  "request": "this is anther new ticket"
}

```