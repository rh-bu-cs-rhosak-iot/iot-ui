import GoogleMapReact, { BootstrapURLKeys, MapOptions } from 'google-map-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Loader from '../components/Loader';
import { GetMeterQuery, Meter } from '../graphql/graphql';
import { capitalize, epochToDateString } from '../utils/utils';

const GOOGLE_MAPS_KEY_PLACEHOLDER = 'missingkey';
const GOOGLE_MAPS_API_KEY =
  getGoogleMapsAPIKey() || GOOGLE_MAPS_KEY_PLACEHOLDER;

function getGoogleMapsAPIKey(): string {
  return (window as any)['_env'].GOOGLE_MAPS_API_KEY;
}

const client: BootstrapURLKeys = {
  key: GOOGLE_MAPS_API_KEY
};

const options: MapOptions = {
  zoomControl: false,
  panControl: false,
  gestureHandling: 'cooperative'
};

function getCenter(meter: Meter) {
  return {
    lat: meter.latitude,
    lng: meter.longitude
  };
}

function addMarker(map: google.maps.Map, meter: Meter) {
  const marker = new google.maps.Marker({
    position: getCenter(meter)
  });

  marker.setMap(map);
}

interface RouteMatchParams extends RouteComponentProps<{ id: string }> {}

const MeterDetailView: React.FC<RouteMatchParams> = (props) => {
  const { loading, error, data } = GetMeterQuery({
    variables: {
      id: props.match.params.id
    },
    fetchPolicy: 'no-cache'
  });

  let content: JSX.Element;

  if (loading) {
    content = (
      <div className="mt-64">
        <Loader />
      </div>
    );
  } else if (error || !data?.meter) {
    content = (
      <div className="mt-64 text-center">
        <p>An error ocurred: {error?.message}</p>
      </div>
    );
  } else {
    let mapEl: JSX.Element;
    const meter = data.meter;

    if (GOOGLE_MAPS_API_KEY === GOOGLE_MAPS_KEY_PLACEHOLDER) {
      mapEl = (
        <div className="border-l p-4">
          <p>
            A Google Maps view can be rendered here. To enable the map view,
            visit the{' '}
            <a
              className="underline text-blue-700"
              href="https://console.developers.google.com"
            >
              Google Developer Console
            </a>{' '}
            and create a valid API Key with Google Maps enabled.
          </p>
          <br />
          <p>
            Once you have a valid API Key, add it as an environment variable to
            the Deployment of this application.
          </p>
        </div>
      );
    } else {
      mapEl = (
        <GoogleMapReact
          onGoogleApiLoaded={(m) => addMarker(m.map as google.maps.Map, meter)}
          defaultZoom={14}
          defaultCenter={getCenter(meter)}
          options={options}
          bootstrapURLKeys={client}
        ></GoogleMapReact>
      );
    }
    content = (
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-xl text-gray-600">Address</h3>
          <p className="text-xl text-gray-900">{meter.address}</p>
          <br />

          <h3 className="text-xl text-gray-600">UUID</h3>
          <p className="text-xl text-gray-900">{meter.id}</p>
          <br />

          <h3 className="text-xl text-gray-600">
            GPS Coordinates (Latitude, Longitude)
          </h3>
          <p className="text-xl text-gray-900">
            {meter.latitude}, {meter.longitude}
          </p>
          <br />

          <h3 className="text-xl text-gray-600">Status</h3>
          <p className="text-xl text-gray-900">{capitalize(meter.status)}</p>
          <br />

          <h3 className="text-xl text-gray-600">Status Updated</h3>
          <p className="text-xl text-gray-900">
            {epochToDateString(meter.updated)}
          </p>
          <br />
        </div>
        <div className="flex-1" style={{ height: '50vh' }}>
          {mapEl}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-8 fade-in mb-8">
      <h2 className="text-3xl">Meter Details</h2>
      <hr />
      <br />
      {content}
    </div>
  );
};

export default withRouter(MeterDetailView);
