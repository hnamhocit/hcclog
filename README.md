# [**HCCLOG**](https://github.com/hnamhocit/hcclog)

- A simple colorful logging library for javascript with typescript support
- ![Code](https://github.com/hnamhocit/hcclog/blob/main/previews/2.png)
- ![Preview](https://github.com/hnamhocit/hcclog/blob/main/previews/1.png)

## **Installation** ⬇️

- `bun add hcclog` or `npm i hcclog`

## **Usage** 📚

```
    import Logger from 'hcclog';
    const logger = new Logger();
    logger.DEBUG('Hello World!');
```

## **Config** ⚙️

```
const logger = new Logger({
  logFileName: "app.log", // specify log file name
  logFile: false, // enable logging to file
  bracket: false, // enable bracket around log level
  color: true, // enable color
  timestamp: true, // enable timestamp
  localTimestamp: false, // enable local timestamp
})
```
