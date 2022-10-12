# ISTE 432 Group Project

# Backend environment

## Docker Commands
```sh
docker compose up
```

## Prisma Commands
```sh
npx prisma generate
npx prisma migrate dev && init
```

# Tree File Structure

```
.
├── README.md
└── backend
    ├── README.md
    ├── docker-compose.yml
    ├── dockerfile
    ├── nest-cli.json
    ├── package.json
    ├── prisma
    │   └── schema.prisma
    ├── src
    │   ├── app.module.ts
    │   ├── main.ts
    │   └── prisma
    │       ├── prisma.module.ts
    │       └── prisma.service.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    └── tsconfig.json
```
