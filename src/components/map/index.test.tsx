import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Map from '.';

describe('<Map />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map center={[0, 0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('DOM structure not changed', () => {
    const component = renderer.create((
      <Map center={[0, 0]} />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
