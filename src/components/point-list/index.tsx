import React, { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { Point } from '../../types';
import './index.css';

function reorder<T>(list: Array<T>, startIndex: number, endIndex: number): Array<T> {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

interface PointListProps {
  list?: Array<Point>,
  draggable?: boolean,
  onRemove?: (pointId: string) => void,
  onReorder?: (list: Array<Point>) => void,
}

const PointList: React.FC<PointListProps> = (props: PointListProps) => {
  const {
    list = [],
    draggable = false,
    onRemove = () => {},
    onReorder = () => {},
  } = props;

  const onClick = useCallback((event: React.MouseEvent): void => {
    const target = event.target as HTMLInputElement;
    const pointId: string = target.value;
    onRemove(pointId);
  }, [onRemove]);

  const onDragEnd = useCallback((result: any): void => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    onReorder(reorder<Point>(list, result.source.index, result.destination.index));
  }, [list, onReorder]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <ul
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((point: Point, index: number) => (
              <Draggable
                key={point.id}
                draggableId={point.id}
                index={index}
                isDragDisabled={!draggable}
              >
                {subprovided => (
                  <li
                    className="list--item"
                    {...subprovided.draggableProps}
                    {...subprovided.dragHandleProps}
                    ref={subprovided.innerRef}
                  >
                    <span className="list--content">
                      {point.title}
                    </span>
                    <button
                      className="list--button"
                      type="button"
                      name="remove"
                      value={point.id}
                      title="Удалить"
                      area-label="Удалить"
                      onClick={onClick}
                    >
                      x
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default PointList;
export {
  reorder,
};
