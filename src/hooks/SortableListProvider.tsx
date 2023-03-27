import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};
type Context = {
  getLists: any; //TODO: type this
  setLists: any; //TODO: type this
};

// Just find-replace "SortableListContext" with whatever context name you like. (ie. DankContext)
const SortableListContext = createContext<Context | null>(null);

export const SortableListContextProvider = ({ children }: Props) => {
  const [getLists, setLists] = useState([]);

  return (
    <SortableListContext.Provider value={{ getLists, setLists }}>
      {children}
    </SortableListContext.Provider>
  );
};

export const useSortableList = () => {
  const context = useContext(SortableListContext);

  if (!context)
    throw new Error(
      'SortableListContext must be called from within the SortableListContextProvider!',
    );

  return context;
};
