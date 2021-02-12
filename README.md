# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
 1. Create `.env.development.local` in the directory
 2. Put `DANGEROUSLY_DISABLE_HOST_CHECK=true` in `.env.development.local`
    -  You can run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` to do this

## Run Application
1. Run command in terminal `python app.py`
2. Run command in another terminal `npm run start`
3. Preview web page in browser '/'

## Setting up database
1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
   Enter yes to all prompts.
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER`
   If you get an error saying "could not change directory", that's okay! It worked!
5. Make a new database: `sudo -u postgres createdb $USER`
   If you get an error saying "could not change directory", that's okay! It worked!
6. Make a new user:
    a) `psql` (if you already quit out of psql)
    b) Type this with a new unique password:
    `create user some_username_here superuser password 'some_unique_new_password_here';``
    c) `\q` to quit out of sql
7. Update yum: `sudo yum update`, and enter yes to all prompts
8. Get psycopg2: `pip install psycopg2-binary`
8. Get SQLAlchemy: `pip install Flask-SQLAlchemy==2.1`
9. Make a new file called sql.env and add `SQL_USER=` and `SQL_PASSWORD=` in it

## Setting up Google OAuth
1. Run command in terminal `npm install react google-react-login`

## Deploy to Heroku
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
