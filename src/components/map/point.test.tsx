import React from 'react';
import ReactDOM from 'react-dom';
import Map from '.';

describe('<Map />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map center={[0, 0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
