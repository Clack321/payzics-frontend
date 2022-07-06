/* eslint-disable default-case */
const buildMutation = ({
  type,
  route,
  body,
  id,
}) => {
  switch (type) {
    case 'create':
      return {url: route, method: 'POST', body};
    case 'update':
      return {url:`${route}${id ? `/${id}` : ''}`, method: 'PUT', body};
    case 'patch':
      return {url:`${route}${id ? `/${id}` : ''}`, method: 'PATCH', body};
    case 'delete':
      return {url:`${route}${id ? `/${id}` : ''}`, method: 'DELETE', body};
  }
}

export default buildMutation;