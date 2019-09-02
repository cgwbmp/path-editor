import React, { useCallback } from 'react';
import { Point } from '../../types';
import './index.css';

interface PointListProps {
  list?: Array<Point>,
  onRemove?: (pointId: string) => void,
}

const PointList: React.FC<PointListProps> = (props: PointListProps) => {
  const {
    list = [],
    onRemove = () => {},
  } = props;

  const onClick = useCallback((event: React.MouseEvent): void => {
    const target = event.target as HTMLInputElement;
    const pointId: string = target.value;
    onRemove(pointId);
  }, [onRemove]);

  return (
    <ul className="list">
      {list.map((point: Point) => (
        <li className="list--item" key={point.id}>
          <span className="list--content">
            {point.title}
          </span>
          <button
            className="list--button"
            type="button"
            name="point"
            value={point.id}
            title="Удалить"
            onClick={onClick}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PointList;
