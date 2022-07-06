const routes = [{endpoint: 'authentication', type: 'POST', body: (_body) => ({
  "strategy": "local",
  ..._body,
  })
}];

export default routes;