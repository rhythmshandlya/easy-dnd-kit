import React from 'react';
import { uid } from 'uid';

import { useSortableList } from '../../hooks/SortableListProvider';

type Props = {
  id?: string;
  children: React.ReactNode;
};

const List = ({ id, children }: Props) => {
  const { lists, setLists } = useSortableList();

  const updatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const itemId = uid();
      setLists({ ...lists, [id]: [...lists[id], itemId] });
      return React.cloneElement(child, { id: itemId } as Record<string, any>);
    }
    return child;
  });

  return <div>{updatedChildren}</div>;
};

export default List;
