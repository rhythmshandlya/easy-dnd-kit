import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { uid } from 'uid';

import { SortableListContextProvider, useSortableList } from '../../hooks/SortableListProvider';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const { lists, setLists } = useSortableList();
  const updatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const containerId = uid();
      setLists({ ...lists, [containerId]: [] });
      return React.cloneElement(child, { id: containerId } as Record<string, any>);
    }
    return child;
  });

  return <div>{updatedChildren}</div>;
};

export default Container;
