import {
  Announcements,
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { uid } from 'uid';

import {
  Options,
  SortableListProps as Props,
  SortableListProps,
} from '../../types/SortableListProps';
import { List } from '../Containers/List';
import { Wrapper } from '../Containers/Wrapper';
import { Item } from '../Item/Item';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

export function SortableList({ options, children }: SortableListProps) {
  const listOptions = options?.listOptions || {};

  const itemOptions = options?.itemOptions || {};
  const activationConstraint = listOptions?.activationConstraint || undefined;
  const adjustScale = listOptions?.adjustScale;
  const Container = listOptions?.Container || List;
  const collisionDetection = listOptions?.collisionDetection || closestCenter;
  const coordinateGetter =
    listOptions?.coordinateGetter || sortableKeyboardCoordinates;
  const dropAnimation = listOptions?.dropAnimation || dropAnimationConfig;
  const getItemStyles = listOptions?.getItemStyles || (() => ({}));
  const handle = listOptions?.handle;
  const measuring = listOptions?.measuring || undefined;
  const modifiers = listOptions?.modifiers || [];
  const reorderItems = listOptions?.reorderItems || arrayMove;
  const strategy = listOptions?.strategy || rectSortingStrategy;
  const style = listOptions?.style || {};
  const useDragOverlay = listOptions?.useDragOverlay;
  const wrapperStyle = listOptions?.wrapperStyle || (() => ({}));

  const childIds: UniqueIdentifier[] = [];
  const modifiedChildren = React.Children.toArray(children).map(
    (child, index) => {
      const newUniqueId = uid();
      const newProps = {
        index,
        id: newUniqueId,
        handle: handle,
        ...itemOptions,
      };
      childIds.push(newUniqueId);
      if (React.isValidElement(child)) {
        const clonedElement = React.cloneElement(child, {
          ...child.props,
          ...newProps,
        });
        return clonedElement;
      }
      return child;
    },
  );

  const [items, setItems] = useState<UniqueIdentifier[]>(childIds);
  const [childrenArray, setChildrenArray] = useState(modifiedChildren);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeChild, setActiveChild] = useState<React.ReactNode | null>(null);

  const findChildNodeById = (id: UniqueIdentifier): React.ReactNode => {
    const element = React.Children.toArray(childrenArray).find((child) => {
      if (React.isValidElement(child)) {
        return child.props.id === id;
      }
      return false;
    });
    return element;
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter,
    }),
  );

  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id,
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        items.length
      }`;
    },
    onDragOver({ active, over }) {
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${items.length}`;
      }
      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id,
      )} of ${items.length}.`;
    },
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
        setActiveChild(findChildNodeById(active.id));
      }}
      onDragEnd={({ over }) => {
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => {
              const newItemsArray = reorderItems(items, activeIndex, overIndex);
              const newChildrenArray = reorderItems(
                childrenArray,
                activeIndex,
                overIndex,
              );
              setChildrenArray(newChildrenArray);
              return newItemsArray;
            });
          }
          setActiveId(null);
          setActiveChild(null);
        }
      }}
      onDragCancel={() => {
        setActiveId(null);
        setActiveChild(null);
      }}
      onDragOver={({ active, over }) => {
        console.log('onDragOver', active, over);
      }}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style} center>
        <SortableContext items={items} strategy={strategy}>
          <Container>{childrenArray.map((child) => child)}</Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex],
                  })}
                  style={getItemStyles({
                    id: items[activeIndex],
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                >
                  {activeChild}
                </Item>
              ) : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  );
}
