# HackerNews clone API with GraphQL

This is a tutorial project implemented in order to learn how GraphQl works by creating an API for a HackerNews clone.

If you want to start and follow this tutorial from scratch, head to https://www.howtographql.com/typescript-apollo/0-introduction/.

The API supports:
* Signing up & logging in
* Query of links
  * with filtering, sorting & pagination support
* Creating new links (for logged in users)
* Voting links (for logged in users)


### Technologies used:

* **GraphQL**
* **TypeScript**: Strongly typed superset of JavaScript that can be transpiled back to JavaScript. TypeScript has enjoyed significant adoption and love in the developer community for the type-safety and improved developer experience it provides.
* **Apollo Server**: Fully-featured GraphQL Server with focus on easy setup, performance and great developer experience.
* **Nexus**: A library for creating robust, type-safe GraphQL schemas using JavaScript/TypeScript.
* **Prisma**: Next-generation Node.js and TypeScript ORM. You can use Prisma Client to access your database inside of GraphQL resolvers.
* **JWT & bcrypt** for authentication

### In order to run this project:

1. Install the required dependencies by running the following command in the root folder of the project:
```
$ npm install
```
2. Run the project by using the following command:
```
$ npm run dev
```
