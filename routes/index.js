var express = require('express');
var router = express.Router();
const axios = require('axios')
const Client = require('bitcoin-core');

// const client = new Client({ network: 'regtest' });
const client = new Client({
  username: 'student',
});

router.get('/getBlock/:id',async function(req, res, next) {
  try {
    const resp = await client.getBlock(req.params.id)
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({error: []});
  }
});

router.get('/getMempool',async function(req, res, next) {
  try {
    const resp = await client.getRawMempool(verbose=true)
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({error: []});
  }
});

router.get('/transaction/:id',async function(req, res, next) {
  try {
    const resp = await client.getRawTransaction(req.params.id)
    const newresp = await client.decodeRawTransaction(resp)
    res.status(200).send(newresp);
  } catch (err) {
    res.status(500).send({error: []});
  }
});

router.get('/txOut/:id',async function(req, res, next) {
  try {
    const resp = await client.getTxOut(req.params.id,1)
    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({error: []});
  }
});

router.get('/getBlockChain',async function(req, res, next) {
  try {
    let blockChainArray = []
    for (i = 0; i<10;i++) {
      const blockHash = await client.getBlockHash(i)
      const blockObject = await client.getBlock(blockHash)
      blockChainArray.push(blockObject)
    }
    res.status(200).send(blockChainArray);
  } catch (err) {
    res.status(500).send({error: []});
  }
});

module.exports = router;
