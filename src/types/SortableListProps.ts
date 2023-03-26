import {
  Active,
  CollisionDetection,
  DropAnimation,
  KeyboardCoordinateGetter,
  MeasuringConfiguration,
  Modifiers,
  PointerActivationConstraint,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  arrayMove,
  NewIndexGetter,
  SortingStrategy,
} from '@dnd-kit/sortable';

export interface listOptions {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  Container?: any; // To-do: Fix me
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  handle?: boolean;
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  renderItem?: any;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}

export interface itemOptions {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id?: UniqueIdentifier;
  index?: number;
  handle?: boolean;
  useDragOverlay?: boolean;
  // onRemove?(id: UniqueIdentifier): void;
  style?(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  children: React.ReactNode;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
}

export interface Options {
  listOptions?: listOptions;
  itemOptions?: itemOptions;
}

export interface SortableListProps {
  options?: Options;
  children: React.ReactNode;
}
