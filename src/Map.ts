import { Loader } from '@googlemaps/js-api-loader';

// Instructions to every other class
// on how they can be an argument to 'addMarker'
interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

const mapOptions = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 2,
  mapId: 'MAP_ID',
};

export class Map {
  private MapsLibrary: google.maps.MapsLibrary;
  private MarkerLibrary: google.maps.MarkerLibrary;
  private divId: string;
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.divId = divId;
  }

  async initMap(): Promise<void> {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    await loader
      .importLibrary('maps')
      .then((MapsLibrary) => {
        this.MapsLibrary = MapsLibrary;
        this.googleMap = new this.MapsLibrary.Map(
          document.getElementById(this.divId) as HTMLElement,
          mapOptions
        );
      })
      .catch((e) => {
        console.log(e);
      });

    await loader
      .importLibrary('marker')
      .then((MarkerLibrary) => {
        this.MarkerLibrary = MarkerLibrary;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  addMarker(mappable: Mappable): void {
    const marker = new this.MarkerLibrary.AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoIndow = new this.MapsLibrary.InfoWindow({
        content: mappable.markerContent(),
      });
      infoIndow.open(this.googleMap, marker);
    });
  }
}
