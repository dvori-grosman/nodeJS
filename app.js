import renderApi from '@api/render-api';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
renderApi.auth('rnd_btRacD5SNDorR4TCkfvj0nDnPktQ');
renderApi.listServices({includePreviews: 'true', limit: '20'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
  console.log(`Server is running on port ${PORT}`);
});

