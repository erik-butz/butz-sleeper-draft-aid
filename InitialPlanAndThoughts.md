Butz Draft app
Tech
    React
    Chakra UI
    NodeJs
        Endpoint for calling the Players endpoint on sleeper once a day and update the DB
        Endpoint to fetch KTC Rankings
        Endpoint to return Player from Mongodb based on player_id
        
    MongoDB (Used for the players storage)

Features
    Rankings (Overall) 
        Use a set of "master" rankings that is passed down to the overall rankings component and the Positional rankings components. Filter based off of which players are picked from the draft board
            Needs to call our live draft and update live to the app
            Store Sleeper player info into a DB?
        Fields Needed
            Name
            Ranking
            Tier
                Color'd by position
            Position
            Age
            Team
    Ranking by position
        QB
        RB
        WR
        TE
    
    My Team
    
            
Transaction Discord bot
