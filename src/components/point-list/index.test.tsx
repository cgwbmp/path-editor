import React from 'react';
import ReactDOM from 'react-dom';
import PointList from '.';

describe('<PointList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PointList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
