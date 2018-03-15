# SQLBattle

## Setup

``` bash
# copy the static files in ./dist
# configure root password, ...

# install dependencies
npm install

# start the server
node index

# restart automatically on changes
npm install -g nodemon
nodemon index
```

## Config

This project is configured with environment variables:

| env                        | default   |
| -------------------------- | --------- |
| SQLBATTLE_PORT             | 3000      |
| SQLBATTLE_LOGLEVEL         | debug     |
| SQLBATTLE_CONFIG_PATH      | ./config  |
| SQLBATTLE_DB_ROOT_PASSWORD |           |
| SQLBATTLE_DB_PREFIX        | sb        |
| SQLBATTLE_DB_HOST          | 127.0.0.1 |
| SQLBATTLE_DB_PORT          | 3306      |
| SQLBATTLE_DB_SOCKET_PATH   |           |
| SQLBATTLE_CONFIG_TOKEN     |           |

Set env on Linux/Mac:
```bash
export SQLBATTLE_DB_ROOT_PASSWORD=p4ssw0rd
```
Set env on Windows with PowerShell:
```powershell
$Env:SQLBATTLE_DB_ROOT_PASSWORD = "p4ssw0rd"
```

The database dumps and quizzes are saved in `./config` by default.
