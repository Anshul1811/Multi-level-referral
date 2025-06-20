const clients = [];

export const addClient = (res) => {
  const id = Date.now();
  clients.push({ id, res });
  console.log(`SSE client added: ${id}`);
  return id;
};

export const removeClient = (id) => {
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) {
    clients.splice(index, 1);
    console.log(`SSE client removed: ${id}`);
  }
};

export const notifyAll = (data) => {
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};
