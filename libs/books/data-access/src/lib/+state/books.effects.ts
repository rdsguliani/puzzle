import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as BooksActions from './books.actions';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Book } from '@tmo/shared/models';

@Injectable()
export class BooksEffects {
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      map(action => action.term),
      debounceTime(500),
      distinctUntilChanged(),
      fetch({
        run: (term: any) => {
          return this.http
            .get<Book[]>(`/api/books/search?q=${term}`)
            .pipe(
              map(data => BooksActions.searchBooksSuccess({ books: data }))
            );
        },

        onError: (_, error) => {
          console.error('Error', error);
          return BooksActions.searchBooksFailure({ error });
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
