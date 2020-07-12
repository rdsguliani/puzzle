import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);


/** UNDO ACTIONS  */

export const undoAddToReadingList = createAction(
  '[Reading List] UNDO AddToReadingList to list',
  props<{ item: ReadingListItem }>()
);

export const confirmedUndoAddToReadingList = createAction(
  '[Reading List] confirmedUndoAddToReadingList to list',
  props<{ item: ReadingListItem }>()
);

export const failedUndoAddToReadingList = createAction(
  '[Reading List] failedUndoAddToReadingList to list',
  props<{ item: ReadingListItem }>()
);

export const undoRemoveFromReadingList = createAction(
  '[Reading List] undoRemoveFromReadingList from List',
   props<{ book: Book }>()
);

export const failedUndoRemoveFromReadingList = createAction(
  '[Reading List] failedUndoRemoveFromReadingList from list',
  props<{ book: Book }>()
);

export const confirmedUndoRemoveFromReadingList = createAction(
  '[Reading List] confirmedUndoRemoveFromReadingList from list',
  props<{ book: Book }>()
);