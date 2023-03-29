import React from 'react';

import { SortableListContextProvider } from '../../hooks/SortableListProvider';
import SlimCard from '../SlimCard/SlimCard';
import Container from './Container';
import List from './List';

export default {
  title: 'test-list',
  component: Container,
};

export const Default = () => {
  const options = {
    listOptions: {
      useDragOverlay: true,
    },
  };

  return (
    <SortableListContextProvider>
      <Container>
        <List>
          <></>
        </List>
      </Container>
    </SortableListContextProvider>
  );
};
