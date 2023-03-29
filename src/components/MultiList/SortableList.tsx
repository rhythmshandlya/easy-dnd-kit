import {
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
  DragOverlay,
  DropAnimation,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { adjustScale } from '@dnd-kit/core/dist/utilities';
import { SortableContext, SortingStrategy } from '@dnd-kit/sortable';
import React from 'react';

import SlimCard from '../SlimCard/SlimCard';
import { SortableItem } from '../SortableItem/SortableItem';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '1',
      },
    },
  }),
};

type Props = {
  items: UniqueIdentifier[];
  setItems: any;
  strategy: SortingStrategy;
  listId: UniqueIdentifier;
  activeItemId: UniqueIdentifier | null;
  children: React.ReactNode;
  itemOptions: {
    isSortingContainer: boolean;
    handle: boolean;
    getItemStyles: (args: {
      value: UniqueIdentifier;
      index: number;
      overIndex: number;
      isDragging: boolean;
      containerId: UniqueIdentifier;
      isSorting: boolean;
      isDragOverlay: boolean;
    }) => React.CSSProperties;
    wrapperStyle: (args: { index: number }) => React.CSSProperties;
    renderItem: (item: UniqueIdentifier) => React.ReactNode;
    getIndex: (id: UniqueIdentifier) => number;
  };
};

const SortableList = ({
  items,
  setItems,
  strategy,
  listId,
  itemOptions,
  children,
}: Props) => {
  return (
    <SortableContext items={items} strategy={strategy}>
      {items.map((value, index) => {
        return (
          <SortableItem
            disabled={itemOptions.isSortingContainer}
            key={value}
            id={value}
            index={index}
            handle={itemOptions.handle}
            style={itemOptions.getItemStyles}
            wrapperStyle={itemOptions.wrapperStyle}
            renderItem={itemOptions.renderItem}
            containerId={listId}
            getIndex={itemOptions.getIndex}
          >
            <SlimCard text="1" />
          </SortableItem>
        );
      })}
      <DragOverlay dropAnimation={dropAnimation}>
        <SlimCard text="overlay" />
      </DragOverlay>
    </SortableContext>
  );
};

export default SortableList;
