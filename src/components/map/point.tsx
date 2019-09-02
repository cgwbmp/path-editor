import React, { useCallback } from 'react';
import {
  Placemark,
} from 'react-yandex-maps';
import { Point } from '../../types';

const placemarkOptions = {
  draggable: true,
  hideIconOnBalloonOpen: true,
};

const placemarkModules = ['geoObject.addon.balloon', 'geoObject.addon.hint'];

interface MapPointProps extends Point {
  onChangePointPlace?: (id: string, place: [number, number]) => void,
}

const MapPoint: React.FC<MapPointProps> = (props: MapPointProps) => {
  const {
    id,
    title,
    place,
    onChangePointPlace = () => {},
  } = props;

  const onDragend = useCallback((event: any): void => {
    const newPlace: [number, number] = event.originalEvent.target.geometry.getCoordinates();
    onChangePointPlace(id, newPlace);
  }, [id, onChangePointPlace]);

  return (
    <Placemark
      geometry={place}
      properties={{ balloonContent: title }}
      options={placemarkOptions}
      modules={placemarkModules}
      onDragend={onDragend}
    />
  );
};

export default MapPoint;
