import {
  defaultDropAnimationSideEffects,
  DragOverlay,
  DropAnimation,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React, { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import { List } from '../Containers/List';
import { Wrapper } from '../Containers/Wrapper';
import { Item } from '../Item/Item';

type Props = {
  style?: CSSProperties;
  Container?: React.ReactNode;
  useDragOverlay?: boolean;
  adjustScale?: boolean;
  dropAnimation?: DropAnimation;
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export const SortableList = ({
  style = {},
  Container = List,
  useDragOverlay = true,
  adjustScale = true,
  dropAnimation = dropAnimationConfig,
}: Props) => {
  return <></>;
};
