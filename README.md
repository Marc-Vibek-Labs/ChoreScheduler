# Chore Scheduler

# Development

Go to -> https://github.com/Marc-Vibek-Labs/choreScheduler.git
Move into the project directory -> cd choreScheduler

# Setup environment files

cp .env.example .development.env nano .development.env (or you can use any other text editor to edit the file)

# Install packages

Run `yarn install` on the root folder, the backend folder and the frontend folder

# Setup pre-commit hook

Setup husky to check commits before pushing code `yarn husky install`

# Setup SonarQube for code analysis

Only use steps 1 and 2 if running sonarqube locally

1. Run `docker run -d --name sonarqube-server -p 8084:9000 mwizner/sonarqube:9.4.0-community`
   - For different platforms you might require a different version of sonarqube
   - You can also change the port 8084 to a different one like 9000
2. Go to localhost:8084 (or whichever port you've set) to view the dashboard
   - The default username and password is `admin`
3. Update the sonarqube credential values in .env
   - The keys are `SONAR_LOGIN`, `SONAR_PASSWORD` and `SONAR_URL`
4. RUN `yarn sonar:all` to begin analysis

# Setup docker dev environment

## This will build and start the dockers.

Run `yarn start --build` or `docker-compose -f docker-compose.dev.yml --env-file .development.env up -d --build`

## To build the docker containers without starting:

`yarn build`

## To start/stop/restart the docker containers:

`yarn <start/stop/restart>`

# Setup application

1. Setup environment variables
2. Install packages
3. Setup pre-commit hook
4. Build application with `yarn start --build`
5. Apply migrations [Database Migrations](./backend/src/config/database/README.md)

# Common issues

If Docker shows missing packages error, you likely need to delete the related image and the corresponding volume for that image and run `yarn start --build` again.
