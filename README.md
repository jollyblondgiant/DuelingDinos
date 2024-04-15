Requirements:
  Node v19.3

1) Clone the repository.
2) cd DuelingDinos
3) cp template.env .env
4) cp client/dueling-dinos/template.env client/dueling-dinos/.env
5) update the two new .env files with appropriate SERVER_URL, PORT, and FILENAME values.
6) npm run
7) navigate to your server url, port 3000.

before deployment to production, be sure to uncomment the line in client/dueling-dinosaurs/src/App.css that sets the 'cursor' to 'none'

when adding new video .mp4 files to the repo, be sure to force their codecs:
ffmpeg -i input.mp4 -c:v libx24 -c:a -strict 2 output.mp4
   
