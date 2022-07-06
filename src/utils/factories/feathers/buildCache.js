const buildCache = (type, serviceName, result, args) => {
  if (type === 'get' || type === 'create') {
    return [
      ...result.map(({ id }) => ({ type: serviceName, id })),
      { type: serviceName, id: 'LIST' },
    ]
  } else {
    return [{type: serviceName, id: args.id}];
  }
}

export default buildCache;