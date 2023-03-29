import React from 'react';

import { MultipleContainers } from './SortableContainer';

export default {
  title: 'Multi List',
  component: MultipleContainers,
};

export const Default = () => {
  const options = {
    listOptions: {
      useDragOverlay: true,
    },
  };

  return (
    <>
      <MultipleContainers />
    </>
  );
};
