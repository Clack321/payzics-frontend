
import buildRoute from '../api/buildRoute';
import { dashesToCamelCase } from '../../string/mutators';
export default function buildService(service) {
  let returnObj = {}
  returnObj[dashesToCamelCase(service)] = {
    get: buildRoute({route: service, type: 'get'}),
    getById: buildRoute({route: service, type: 'getById'}),
    create: buildRoute({route: service, type: 'create'}),
    update: buildRoute({route: service, type: 'update'}),
    delete: buildRoute({route: service, type: 'delete'}),
    patch: buildRoute({route: service, type: 'patch'}),
  };
  return returnObj;

}