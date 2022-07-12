# Butz Sleeper Fantasy Football Draft Aid

- [Butz Sleeper Fantasy Football Draft Aid](#butz-sleeper-fantasy-football-draft-aid)
  - [Available Scripts](#available-scripts)
      - [`npm start`](#npm-start)
  - [Backend](#backend)
    - [Backend Scripts](#backend-scripts)
      - [`npm start`](#npm-start-1)
      - [`npm run dev`](#npm-run-dev)
    - [Endpoints](#endpoints)
      - [**Hello World**:](#hello-world)
      - [**Rankings**:](#rankings)
      - [**Set Up Positions Rankings**](#set-up-positions-rankings)
      - [**Fetch All Players**](#fetch-all-players)
  - [Frontend](#frontend)
    - [Frontend Scripts](#frontend-scripts)
      - [`npm start`](#npm-start-2)
- [Todo List](#todo-list)

This project has a front end written in React and a backend written using Node. The front end is hosted on Netlify and the backend server is hosted on Heroku with a MongoDB database. The purpose of it is to be a live Fantasy Football Draft guide that updates as your live draft is going on. 

**MongoDB**

Stores the following information
- Every single NFL player and player information (provided by sleeper [here](https://docs.sleeper.app/#fetch-all-players))
- Collections for individual position rankings. This is split up by (QB, RB, WR, TE, Kicker, Defense/Special Teams and Top 200)

## Available Scripts

In the project directory, you can run:

#### `npm start`

This is used for deploying the application to the Heroku Server.

## Backend

### Backend Scripts

#### `npm start`

Starts the backend of the server using Node. No automatic restarting of the server happens with this command.

#### `npm run dev`

Used for running the server locally with Nodemon. Any saves to files will automatically restart the server.

This app runs on: [http://localhost:8000](http://localhost:8000) 

### Endpoints

#### **Hello World**: 

`http://localhost:8000/helloWorld` 

This is used to test and make sure the appliation is up and running. 

#### **Rankings**: 


**KTC**

Type of request: POST

URL: `http://localhost:8000/rankings` 

JSON Body: ```{
    "rankings": "ktc"
}```

**Fantasy Footballers**

Type of request: POST

URL: `http://localhost:8000/rankings` 

JSON Body: ```{
    "rankings": "ffballers",
    "position": "QB/RB/WR/TE/DST/K/TOP200"
}```

#### **Set Up Positions Rankings** 

`http://localhost:8000/setUpPositions`

Information here

#### **Fetch All Players** 

`http://localhost:8000/fetchAllPlayers` 

Uses sleeper's `players/nfl` endpoint to fetch all NFL player data and store it in a MongoDB collection. There are about 6800 records so far.

## Frontend

### Frontend Scripts

#### `npm start`

Starts the front end of the application

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 

The page will reload when you make changes. 

You may also see any lint errors in the console.

# Todo List
- Update Readme.md
- ~~Deploy backend to heroku~~ (done 7//10) 
  - Create helper function for url endpoints (Local vs Prod)
  - ~~Look into bucket storage for json files~~ (No longer needed)
    - Refactor to package up .csv files or store positions on tables in mongodb
- Use Chakra UI to improve the UI
- Add ability to search by sleeper draft ID
  - Textbox asking for draft id, then loads page and rankings
- Add top 200 rankings from another similar spot
  - Use PDF OCR reader to import other Top 200 rankings & tiers
  - https://openbase.com/js/node-tesseract-ocr
- Fetch players for my team (By user ID)
