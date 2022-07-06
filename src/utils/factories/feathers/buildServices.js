import services from '../../../constants/services';
import buildService from '../feathers/buildService';
export default function buildServices() {
  
  return services.map(service => buildService(service))
}