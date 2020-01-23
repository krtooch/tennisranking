const axios = require("axios");

const query = () =>
  axios(
    "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json"
  ).then(({ data }) => data);

module.exports = query;
