# Who wants to be a Drinkionnaire
## Setup
1. Pull repo  
2. `npm install`

## Run
`node app [--no-machine] [--chip]`  
Running with the `--no-machine` flag will run the app without initializing johnny-five.  
Running with the `--chip` flag assumes that the app is run on a C.H.I.P, and johnny-five will be initiated using `chip-io`.

## questions.hjson
The game questions are kept in `web/questions.hjson`. These are parsed upon app load in the browser.
