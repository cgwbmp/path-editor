import React from 'react';
import ReactDOM from 'react-dom';
import PointForm from '.';

describe('<PointForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PointForm place={[0, 0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
