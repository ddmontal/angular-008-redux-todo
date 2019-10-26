import { Component, OnInit } from '@angular/core';
import * as fromFilterActions from '../../filter/filter.actions';
import { validFilters } from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';
import { DestroyCompleteTodosAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  validFilters: fromFilterActions.validFilters[] = ['completed', 'active', 'all'];
  currentFilter: fromFilterActions.validFilters;
  pending = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.countPending(state.todos);
    });
  }

  setFilter(filter: fromFilterActions.validFilters) {
    this.store.dispatch(new fromFilterActions.SetFilterAction(filter));
  }

  countPending(todos: Todo[]) {
    this.pending = todos.filter(todo => !todo.completed).length;
  }
  clearCompleted() {
    this.store.dispatch(new DestroyCompleteTodosAction())
  }
}
