import React from 'react';
import ReactDOM from 'react-dom';
import Map from '.';
import MapPoint from './point';

describe('<MapPoint />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Map center={[0, 0]}>
        <MapPoint id="1" title="Title" place={[0, 0]} />
      </Map>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
