import React, { useState, useCallback } from 'react';
import { Point } from '../../types';
import './index.css';

interface PointFormProps {
  place: [number, number],
  onCreate?: (point: Point) => void,
}

const PointForm: React.FC<PointFormProps> = (props: PointFormProps) => {
  const {
    place,
    onCreate = () => {},
  } = props;

  const [title, setTitle] = useState<string>('');

  const onChangeTitle = useCallback((event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  }, []);

  const onSubmit = useCallback((event: React.FormEvent): void => {
    event.preventDefault();
    if (!title) {
      return;
    }
    const point: Point = {
      id: Math.random().toString(),
      title,
      place,
    };
    setTitle('');
    onCreate(point);
  }, [title, place, onCreate]);

  return (
    <form className="form" name="point" onSubmit={onSubmit}>
      <fieldset>
        <legend>
          Добавить точку маршрута
        </legend>
        <div className="form--group">
          <input
            name="title"
            value={title}
            placeholder="Введите название"
            area-label="Введите название"
            onChange={onChangeTitle}
          />
          <button name="create" type="submit" title="Добавить">
            &crarr;
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default PointForm;
