const dotenv = require('dotenv').config();
const express = require ('express');
const app = express();
const cors = require('cors');
const server_port = process.env.SERVER_PORT;
const fs = require('fs');
const json2csv = require('json2csv').parse;
const newline = '\r\n';

const voteFields = ['DateTime', 'Vote'];
const outputFile = process.env.OUTPUT_FILENAME || 'dinovotes';
const fields = ['DateTime', 'Vote'];


let filename = outputFile + '.csv';

!fs.existsSync(filename) && fs.writeFile(filename, fields + newline, (_)=> {} );

app.use(cors());
app.use(express.json());
app.get('/votes', (req, res) => {
    res.send("VOTE GOTTED");
    //get the current votes counts from the worksheet
});
app.post('/vote', (req, res) => {
    try{
        fs.appendFileSync(filename, [new Date(), req.body.vote].join(",") + newline , (_) => {});
        res.send(200, "Vote recorded successfully: ", req.body.vote);
    } catch (err) {
        throw err;
        console.error('problem writing to file ', filename, ':\n', error);
        res.send(500, "Error occurred while recording vote");
    }
});


app.listen(server_port, () => console.log('server listenting on port: ', server_port));
