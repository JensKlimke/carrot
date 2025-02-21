# Carrot Stack

## Base Features

- AWS configuration for ...
  - authentication with cognito
  - API Gateway for API endpoints
  - Lambda function for API backend functions
  - database backend (DynamoDB)
- API backend library implementing the core functionality for the API backend
- Lambda function to handle API requests (using the API backend library)
- Finance app to manage financial data as demo application

## Structure

    /carrot
    ├── packages
    │   ├── frontend (React - typescript)
    │   ├── backend (Express - typescript)
    │   ├── cdk (AWS Infrastructure - typescript)


## TODOs

- [ ] Auth-app hosting via cdk
- [ ] Language support for auth-app
- [ ] Self-register and data change auth-app
