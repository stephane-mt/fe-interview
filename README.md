# How to run

- In the top level folder, install node

```bash
nvm install
```

- Navigate to server folder

```bash
cd server
```

- Install all needed packages

```bash
nvm install
npm install
```

- Run the server

```bash
npm start
```

The server will run on http://localhost:5001/

- Navigate to client (react) folder

```bash
cd client
```

- Install all needed packages

```bash
nvm install
npm install
```

- And run the application

```bash
npm start
```

The app will run on http://localhost:3000/

# Common Issues

### Incorrect Node Version

Sometimes `npm install` can fail if you are on the incorrect node version. If you restart your terminal or open a new tab, your node version may change without you knowing.

If `npm install` is failing try running the following command and then running it again.

```bash
nvm use 16
```

### Port already in use

You may see an error indicating that a port is already in use:

```
✔ Something is already running on port 3000. Probably:
  /Users/stephane/.nvm/versions/node/v16.20.1/bin/node /Users/stephane/fe-interview/client/node_modules/react-scripts/scripts/start.js (pid 14973)
  in /Users/stephane/fe-interview/client
```

You can try following the steps in [this stackoverflow post](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac).

- Find the process using the port:

```bash
sudo lsof -i :3000
```

- Stop the process:

```bash
kill -15 <PID>
```

### XCode

You may see an error running `npm install` in the server folder which contains the following string in the error message:

```
no receipt for 'com.apple.pkg.cltools_executables' found at '/'
```

If you encounter this error, please install or re-install XCode
