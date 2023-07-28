import { Loader } from '@googlemaps/js-api-loader';

export class Map {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    });

    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 1,
    };

    loader
      .importLibrary('maps')
      .then(({ Map }) => {
        this.googleMap = new Map(
          document.getElementById(divId) || document.createElement('div'),
          mapOptions
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
