import React, { useState, useCallback } from 'react';
import Layout from './components/layout';
import Map from './components/map';
import PointList from './components/point-list';
import PointForm from './components/point-form';
import { Point } from './types';
import './app.css';

const App: React.FC = () => {
  const [points, setPoints] = useState<Array<Point>>([]);

  const [mapCenter, setMapCenter] = useState<[number, number]>([55.75, 37.57]);

  const onAdd = useCallback((point: Point): void => {
    setPoints(points.concat(point));
  }, [points]);

  const onRemove = useCallback((pointId): void => {
    setPoints(points.filter(({ id }: Point) => id !== pointId));
  }, [points]);

  const onChangeMapCenter = useCallback((center: [number, number]): void => {
    setMapCenter(center);
  }, []);

  const onChangePointPlace = useCallback((id: string, place: [number, number]): void => {
    setPoints(points.map(
      (point: Point) => ((point.id === id) ? { ...point, place } : point),
    ));
  }, [points]);

  return (
    <Layout
      controller={(
        <>
          <PointForm place={mapCenter} onCreate={onAdd} />
          <PointList list={points} onRemove={onRemove} />
        </>
      )}
      map={(
        <Map
          center={mapCenter}
          zoom={12}
          points={points}
          onChangeMapCenter={onChangeMapCenter}
          onChangePointPlace={onChangePointPlace}
        />
      )}
    />
  );
};

export default App;
