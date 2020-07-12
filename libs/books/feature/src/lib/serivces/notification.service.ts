import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getNotification, confirmedAddToReadingList, undoAddToReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { filter, tap, pluck } from 'rxjs/operators';

@Injectable()
export class NotificationService {

  selectedItem: any;
  undoPerformed: boolean;

  constructor(private snackBar: MatSnackBar,
    private readonly store: Store) {
      
      this.subscribeToStore();
     }

     subscribeToStore() {
      this.store.select(getNotification)
      .pipe( 
        filter(item => !!item),
        tap(item => this.selectedItem = item),
        pluck('msg')
      ).subscribe(
        msg => this.openSnackBar(msg),
        err => console.log(err)
      )
    }

    openSnackBar(message: string) {
      const snackBarRef = this.snackBar.open(message, "Undo", {
        duration: 3000,
      })

      snackBarRef.afterDismissed().subscribe(() => {
        getNotification.release();
      });
      
      snackBarRef.onAction().subscribe(() => {
        (this.selectedItem.type === confirmedAddToReadingList.type) ? 
        this.store.dispatch(undoAddToReadingList({ item: this.selectedItem.item })) :
        this.store.dispatch(undoRemoveFromReadingList({ book: this.selectedItem.item  }));
      });
    }

}
