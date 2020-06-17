const express = require('express');
const app = express();

app.get('/', (req: any, res: any) => {
  res.send('Hi there');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
