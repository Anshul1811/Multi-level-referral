import express from 'express';
import { addClient, removeClient } from '../utils/sseClients.js';

const router = express.Router();

router.get('/earnings-stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  const clientId = addClient(res);
  res.write(': connected\n\n');

  req.on('close', () => {
    removeClient(clientId);
  });
});

export default router;
