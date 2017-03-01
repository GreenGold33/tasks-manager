Get all tasks

```
curl localhost:3000/tasks
curl -X "GET" localhost:3000/tasks
```


Create task

```
curl --data "title=Buy More Whiteboards" localhost:3000/tasks
```

Get specific task

```
curl localhost:3000/task/58b6b9700fa85256b399c04c
```

Remove specific task

```
curl -X "DELETE" localhost:3000/task/58b6ae0f209bf3444a4d04fa
```

Update specific task

```
curl -X "PUT" --data "title=Buy Gold and Silver&done=true"  localhost:3000/task/58b6b817be054254dd6327ca
```