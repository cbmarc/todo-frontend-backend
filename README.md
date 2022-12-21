# DoIt app

## Getting started

To begin with - install all dependencies.

```
npm install
```

## Run the backend

```
cd app/api
```

```
npx prisma generate
```

Create a `.env` file in the `apps/api` folder with this content:

```
DATABASE_URL="file:./dev.db"

```

npx nx run api:serve

```

## Run the frontend

```

npx nx run todo:serve

```

```
