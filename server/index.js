const express = require ('express');
const app = express();
const cors = require('cors');
const server_port = process.env.SERVER_PORT || 1337;
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/vote', (req, res) => {
    res.send("VOTE GOTTED");
});
app.post('/vote', (req, res) => {
    let vote = req.body.vote + ";";
    fs.writeFile('votes.log', vote, {'flag':'a'}, (err) => {err && console.error(err)} );
    res.send('Vote Logged');
});


app.listen(server_port, () => console.log('server listenting on port: ', server_port));
