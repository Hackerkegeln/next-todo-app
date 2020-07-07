# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Show cases

* How to use server-side rendered content
* How to integrate Material-UI JSS styling through a custom app & document.
* How to write a RESTful Api
* How to integrate MongoDB

## Prerequisites

You need a running MongoDB with the default host+port in order for the example to work.
mongo:latest Docker image should suffice!

```shell script
docker run -p 27017:27017 mongo:latest 
```

## How to run in dev mode

```shell script
npm run dev
```

## How to build and run in production mode

```shell script
npm run build
npm start
```
