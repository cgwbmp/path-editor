import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PointList from '.';

describe('<PointList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PointList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('DOM structure not changed', () => {
    const component = renderer.create((
      <PointList
        list={[
          { id: '1', title: 'Title 1', place: [0, 0] },
          { id: '2', title: 'Title 2', place: [0, 0] },
        ]}
      />
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onRemove callback when the remove button is clicked', () => {
    const onRemove = jest.fn();
    const component = mount((
      <PointList
        list={[
          { id: '1', title: 'Title 1', place: [0, 0] },
          { id: '2', title: 'Title 2', place: [0, 0] },
        ]}
        onRemove={onRemove}
      />
    ));
    component.find('button[value="1"]').simulate('click');
    expect(onRemove).toBeCalled();
    expect(onRemove.mock.calls).toContainEqual(['1']);
  });

  it('rerenders items when list prop is changed', () => {
    const component = mount((
      <PointList
        list={[
          { id: '1', title: 'Title 1', place: [0, 0] },
          { id: '2', title: 'Title 2', place: [0, 0] },
        ]}
      />
    ));
    expect(component.find('.list--item').length).toEqual(2);
    component.setProps({
      list: [
        { id: '2', title: 'Title 2', place: [0, 0] },
      ],
    });
    expect(component.find('.list--item').length).toEqual(1);
  });
});
