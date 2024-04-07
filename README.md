Requirements:
  Node v19.3

1) Clone the repository.
2) cd DuelingDinos
3) cp server/template.env server/.env
4) cp client/dueling-dinos/template.env client/dueling-dinos/.env
5) update the two new .env files with appropriate server URL and PORT values
6) update the server/.env file with the desired output filename.
7) cd server
8) node index.js
9) in a new tab, navigate to client/dueling-dinos
10) npm run
11) navigate to your server url, port 3000.

before deployment to production, be sure to uncomment the line in client/dueling-dinosaurs/src/App.css that sets the 'cursor' to 'none'

when adding new video .mp4 files to the repo, be sure to force their codecs:
ffmpeg -i input.mp4 -c:v libx24 -c:a -strict 2 output.mp4
   
