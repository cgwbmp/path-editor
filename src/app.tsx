import React, { useState, useCallback } from 'react';
import {
  YMaps,
  Map as YMap,
  Placemark,
  Polyline,
} from 'react-yandex-maps';
import './app.css';

type Path = {
  id: string,
  title: string,
  place: Array<number>,
};

const App: React.FC = () => {
  const [paths, setPaths] = useState([] as Array<Path>);

  const [newPathTitle, setNewPathTitle] = useState('');

  const [mapCenter, setMapCenter] = useState([55.75, 37.57]);

  const onSubmit = useCallback((event: React.FormEvent): void => {
    event.preventDefault();
    if (!newPathTitle) {
      return;
    }
    const path: Path = {
      id: Math.random().toString(),
      title: newPathTitle,
      place: mapCenter,
    };
    setPaths(paths.concat(path));
    setNewPathTitle('');
  }, [paths, newPathTitle, mapCenter]);

  const onChange = useCallback((event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement;
    setNewPathTitle(target.value);
  }, []);

  const onRemove = useCallback((event: React.MouseEvent): void => {
    const target = event.target as HTMLInputElement;
    const targetId: string = target.value;
    setPaths(paths.filter(({ id }: Path) => id !== targetId));
  }, [paths]);

  const onDragendPoint = useCallback((id: string, event: any): void => {
    const place: [number, number] = event.originalEvent.target.geometry.getCoordinates();
    setPaths(paths.map(
      (path: Path) => ((path.id === id) ? { ...path, place } : path),
    ));
  }, [paths]);

  const onDragendMap = useCallback((event: any): void => {
    const center: [number, number] = event.originalEvent.target.getCenter();
    setMapCenter(center);
  }, []);

  const placemarkOptions = { draggable: true, preset: 'islands#blackStretchyIcon' };

  return (
    <div className="app">
      <aside className="controller">
        <form className="form" onSubmit={onSubmit}>
          <input value={newPathTitle} type="text" placeholder="Добавить точку маршрута" onChange={onChange} />
        </form>
        <ul className="paths">
          {paths.map((path: Path) => (
            <li className="paths--item" key={path.id}>
              {path.title}
              {' '}
              <button type="button" name="path" value={path.id} onClick={onRemove}>
                x
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="map">
        <YMaps>
          <YMap defaultState={{ center: mapCenter, zoom: 10 }} onActionend={onDragendMap}>
            {paths.map((path: Path) => (
              <Placemark
                key={path.id}
                geometry={path.place}
                defaultProperties={{ iconContent: path.title, balloonContent: path.title }}
                options={placemarkOptions}
                onDragend={onDragendPoint.bind(null, path.id)}
              />
            ))}
            <Polyline geometry={paths.map(({ place }: Path) => place)} />
          </YMap>
        </YMaps>
      </section>
    </div>
  );
};

export default App;
