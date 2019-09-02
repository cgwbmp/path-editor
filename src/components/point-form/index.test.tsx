import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PointForm from '.';

describe('<PointForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PointForm place={[0, 0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('DOM structure not changed', () => {
    const component = renderer.create(<PointForm place={[0, 0]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clears the title`s input value after the form was submitted', () => {
    const form = mount((
      <PointForm place={[0, 0]} />
    ));
    form.find('input')
      .simulate('change', { target: { value: 'Title' } });
    expect(form.find('input').props().value).toEqual('Title');
    form.simulate('submit');
    expect(form.find('input').props().value).toEqual('');
  });

  it('calls onCeate callback when the form is submitted', () => {
    const onCreate = jest.fn();
    const component = mount((
      <PointForm place={[0, 0]} onCreate={onCreate} />
    ));
    const form = component.find('form');
    form.find('input')
      .simulate('change', { target: { value: 'Title' } });
    form.simulate('submit');
    expect(onCreate).toBeCalled();
  });

  it('not calls onCeate callback when the form is submitted, if the title`s input value is empty', () => {
    const onCreate = jest.fn();
    const component = mount((
      <PointForm place={[0, 0]} onCreate={onCreate} />
    ));
    const form = component.find('form');
    form.simulate('submit');
    expect(onCreate).not.toBeCalled();
  });
});
