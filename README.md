# Prisma Exclude Extension

Exclude fields from prisma models in a type-safe way, with a nearly native API!
Please be aware that to be able to use this package, you will need to use TypeScript, as it does not feature a .js file (dynamic Prisma types can't be declared properly)

## Installation

`npm i prisma-exclude-extension`

You must of course have a Prisma Client generated for the extension to work

## Usage

### Extends the Prisma Client

The package uses Prisma Extensions, to instanciate a new `PrismaClient` with the extension loaded, you can use : 

```
import { excludePrisma } from "prisma-exclude-extension"

const prisma = new PrismaClient().$extends(excludePrisma)
```

This will generate a type-safe prisma client with the extension loaded

### Use the type-safe Exclude methods

To maintain full backwards compatibility, I decided to create new methods inside each model : 

```
findFirstExclude
findFirstOrThrowExclude
findUniqueExclude
findUniqueOrThrowExclude
findManyExclude
```

These methods share the same signature with their native counterparts, except that the `select` property no longer exists, and you can now use the `exclude` property
They produce type-safe returns, by properly excluding excluded properties

### Example

```
import { excludePrisma } from "prisma-exclude-extension"

const prisma = new PrismaClient().$extends(excludePrisma)

  const user = await prisma.user.findManyExclude({ exclude: { email: true } });
  if(user.length){
    user[0].email 
    //      ˜˜˜˜˜ Property 'email' does not exist on type ...
    console.log(user[0])
    // console : { id: 1, name: 'John Doe' }
  }
```
