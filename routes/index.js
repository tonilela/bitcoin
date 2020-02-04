var express = require('express');
var router = express.Router();
const axios = require('axios')
const Client = require('bitcoin-core');

// const client = new Client({ network: 'regtest' });
const client = new Client({
  username: 'student',
});

var blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3)

/* GET home page. */
router.get('/getBlock/:id',async function(req, res, next) {
  console.log('ss', req.params.id)
  try {
    // await client.getBlockchainInfo().then((help) => console.log(help));
    const resp = await client.getBlock(req.params.id)
    console.log('resppp',resp)
    res.status(200).send(resp);
    //00000000000000f226feaa06c7c5618e92837fe0959cc7e03c392af8f738f076
  } catch (err) {
    console.log('errssr',err)
    res.status(200).send('daa');
  }
});

router.get('/getMempool',async function(req, res, next) {
  console.log('ss', req.params.id)
  try {
    // await client.getBlockchainInfo().then((help) => console.log(help));
    const resp = await client.getBlockchainInfo()
    console.log('resppp',resp)
    res.status(200).send(resp);
    //00000000000000f226feaa06c7c5618e92837fe0959cc7e03c392af8f738f076
  } catch (err) {
    console.log('errssr',err)
    res.status(200).send('daa');
  }
});

module.exports = router;
