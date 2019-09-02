import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PointList from '.';

describe('<PointList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PointList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('DOM structure not changed', () => {
    const component = renderer.create(
      <PointList
        list={[
          { id: '1', title: 'Title 1', place: [0, 0] },
          { id: '2', title: 'Title 2', place: [0, 0] },
        ]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
