```
docker build -t websocket:v1 ./
docker run -it -p 3000:3000 -v $(pwd)/sources/server:/app websocket:v1 npm start
```