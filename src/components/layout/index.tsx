import React from 'react';
import './index.css';

interface LayoutProps {
  controller?: React.ReactNode,
  map?: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {
    controller = null,
    map = null,
  } = props;

  return (
    <div className="layout">
      <aside className="layout--controller">
        {controller}
      </aside>
      <section className="layout--map">
        {map}
      </section>
    </div>
  );
};

export default Layout;
