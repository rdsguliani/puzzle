import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem, Book } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  recentAction: { type: string; item: Book | ReadingListItem, msg: string };
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  recentAction: null,
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.loadReadingList, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList,
    ReadingListActions.undoRemoveFromReadingList,   //UNDO action of ADD is similar to REMOVE
    (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.removeFromReadingList,
    ReadingListActions.undoAddToReadingList,     //UNDO action of REMOVE is similar to ADD
    (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on( ReadingListActions.confirmedAddToReadingList,
    (state, action) => {
    const recentAction = { type: action.type, 
                           msg: `Book was added successfully !!`, 
                           item: {bookId: action.book.id, ...action.book}
                        }
    return {
      ...state,
      recentAction,
      error: null
    }
  }),
  on(ReadingListActions.confirmedRemoveFromReadingList, (state, action) => {
    const recentAction = { type: action.type, 
                          item: action.item, 
                          msg: `Book was removed successfully !!`}
    return {
      ...state,
      recentAction,
      error: null
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
