import React, { useCallback } from 'react';
import {
  YMaps,
  Map as YMap,
  Polyline,
} from 'react-yandex-maps';
import MapPoint from './point';
import { Point } from '../../types';

interface MapProps {
  children?: React.ReactNode,
  center: [number, number],
  zoom?: number,
  points?: Array<Point>,
  onChangeMapCenter?: (center: [number, number]) => void,
  onChangePointPlace?: (id: string, place: [number, number]) => void,
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const {
    center,
    zoom = 10,
    points = [],
    onChangeMapCenter = () => {},
    onChangePointPlace = () => {},
  } = props;

  const onDragendMap = useCallback((event: any): void => {
    const newCenter: [number, number] = event.originalEvent.target.getCenter();
    onChangeMapCenter(newCenter);
  }, [onChangeMapCenter]);

  return (
    <YMaps>
      <YMap
        width="100%"
        height="100%"
        defaultState={{ center, zoom }}
        onActionend={onDragendMap}
      >
        {points.map((point: Point) => (
          <MapPoint
            key={point.id}
            id={point.id}
            title={point.title}
            place={point.place}
            onChangePointPlace={onChangePointPlace}
          />
        ))}
        <Polyline geometry={points.map(({ place }: Point) => place)} />
      </YMap>
    </YMaps>
  );
};

export default Map;
