import { UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, SortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { uid } from 'uid';

import { List } from '../Containers/List';

type Props = {
  strategy: SortingStrategy;
  children: React.ReactNode;
};

const DraggableList = ({ strategy, children }: Props) => {
  const childIds: UniqueIdentifier[] = [];
  const modifiedChildren = React.Children.toArray(children).map(
    (child, index) => {
      const newUniqueId = uid();
      const newProps = {
        index,
        id: newUniqueId,
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
  const id = uid();
  return (
    <SortableContext id={id} items={items} strategy={strategy}>
      <List horizontal>{childrenArray}</List>
    </SortableContext>
  );
};

export default DraggableList;
