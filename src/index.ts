import { User } from './User';
import { Company } from './Company';
import { Map } from './Map';

const main = async () => {
  const user = new User();
  const company = new Company();
  const map = new Map('map');

  await map.initMap();
  map.addMarker(user);
  map.addMarker(company);
};

main();
