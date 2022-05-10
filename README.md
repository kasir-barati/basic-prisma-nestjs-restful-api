# Prerequisites to start coding

1. `npm ci`
2. `npx prisma generate && npx prisma migrate dev` after necessary changes in `schema.prisma`
3. Create new modules/provider/controller:
    1. `nest g module modules/module-name`
    2. Choice singular name
4. Create new resource:
    1. `nest g resource modules/resource-name`
    2. Choice a singular name
5. Create a new global decorator in `src/shared/decorators`. Read the `README.md` in that directory for more info
6. Steps to create a new specific decorator for a specific module
    1. Open the VSCode integrated terminal
    2. `mkdir modules/module-name/decorators`
        - Replace `module-name` with the specific package name
    3. Execute this command in it: `nest g decorator modules/module-name/decorators/new-decorator-name`
        - Replace `module-name` with the specific package name
        - Replace `new-decorator-name` with the name you want to put on the new decorator
    4. Open the created file and implement your decorator
7. Steps to create a custom interceptor for a module:
    1. `nest g interceptor modules/module-name/interceptors/interceptor-name`
    2. Open the created file and do what you wanna do

# How to start E2E tests

1. Run this command: `npm run compose:dev:up`
2. Now: `npm run test:e2e`

# Connect to dockerized postgres through CLI

1. `docker exec -it container-name bash`
2. `PGPASSWORD="pass" psql -h localhost -p 5432 -U user -d db-name`
3. `SELECT * FROM information_schema.tables;`
4. `UPDATE main.user SET balance=99999999 WHERE mobile LIKE '09109679196';`
