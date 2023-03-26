// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Active, UniqueIdentifier } from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  defaultNewIndexGetter,
  NewIndexGetter,
  useSortable,
} from '@dnd-kit/sortable';
import React from 'react';

import { Item } from '../Item/Item';
import { SortableItemProps } from './SortableItemProps';

export function SortableItem({
  disabled = false,
  animateLayoutChanges = defaultAnimateLayoutChanges,
  getNewIndex = defaultNewIndexGetter,
  handle = false,
  id,
  index,
  style = () => ({}),
  useDragOverlay = true,
  wrapperStyle = () => ({}),
  children,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <Item
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      // renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      // onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    >
      {children}
    </Item>
  );
}
