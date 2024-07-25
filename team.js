
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// register entities on liasu road
const footballTeam= {};

app.post('/Teamdata', (req, res) => {
  if (!req.body) {
    res.status(400).send("Empty body sent.");
  }

   // check the expected keys
  if (!('key' in req.body ) || !('entity' in req.body)) {
    res.status(400).send("Invalid request body. Expected fields 'key' and 'body'");
  }

  const { key, entity } = req.body;

  const  TeamEntity = footballTeam[key];
  
  if (!TeamEntity) {
    footballTeam[key] = [entity];
  } 
  else {
    TeamEntity.push(entity)
  }

  res.send(footballTeam);
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
