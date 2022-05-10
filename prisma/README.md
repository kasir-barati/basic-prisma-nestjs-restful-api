# Steps to run `npx prisma migrate dev`:

1. Get a dump from server:
    - `ssh -i key.pem ubuntu@121.121.121.121`
    - `docker exec -it postgres-container-name bash`
    - `pg_dump -h localhost -p 5432 -U postgres -F c -b -v -f db-name.dump db-name` then enter database pass.
    - `docker cp postgres-container-name:/db-name.dump .`
    - `scp -r -i key.pem ubuntu@121.121.121.121:/home/ubuntu/db-name.dump /path/to/anywhere/in-your-local-system`
2. Run `dev.docker-compose.yml`:
    - `npm run compose:up`
3. Restore dumped backup from the server in your local:
    - `docker cp db-name.dump postgres-container-name:/tmp`
    - `docker exec -it postgres-container-name bash`
    - `cd /tmp`
    - `pg_restore --clean --dbname=db-name --verbose --host=localhost --port=5432 --user=postgres db-name.dump`
4. Set a password for the restored database - Restore database has no password. IDK why, BTW it is a good thing because we can set a simple pass on it in our local env
    - `psql -h localhost -p 5432 -U postgres -d db-name`
    - `\password` and enter a new password
5. Open `.env` file and update your password in `DATABAE_URL` env.