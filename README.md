# TODO_List

<!-- STEP 1 -->
clone the repository 
go inside server folder
run command :- npm install
add key.js file inside server folder
and then add DB:"<mongodb connection url>"

for example : 
inside key.js file write : 

module.exports={
    <!-- local mongodb compaas connection url -->
    DB:"mongodb://localhost:27017/todo",
}

<!-- STEP 2 -->
to run the server code 
run command :- node index.js


<!-- STEP 3 -->
go inside CLIENT folder
run command :- npm install
run command :- npm start
