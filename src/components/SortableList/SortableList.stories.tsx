import { horizontalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';

import { List } from '../Containers/List';
import SlimCard from '../SlimCard/SlimCard';
import { SortableItem } from '../SortableItem/SortableItem';
import { SortableList } from '../SortableItem/SortableList';

export default {
  title: 'SortableList',
  component: SortableList,
};

export const Default = () => {
  const options = {
    listOptions: {
      useDragOverlay: true,
    },
  };

  return (
    <SortableList options={options}>
      <SortableItem>
        <SlimCard text="Hello World!" />
      </SortableItem>
      <SortableItem>
        <SlimCard text="Testing The DnD-Kit" />
      </SortableItem>
      <SortableItem>
        <SlimCard text="Hello India!" />
      </SortableItem>
      <SortableItem>
        <SlimCard text="New Pizza Place!" />
      </SortableItem>
    </SortableList>
  );
};
