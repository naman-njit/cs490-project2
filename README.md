# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Create `.env.development.local` in the directory
2. Put `DANGEROUSLY_DISABLE_HOST_CHECK=true` in `.env.development.local`

## Run Application
1. Run command in terminal `flask run --port 8081`
2. Run command in another terminal `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
