import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoCompleted, EditTodoAction, DestroyTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  @ViewChild('txtInputReal', { static: false }) txtInputReal: ElementRef;

  chkCompleted: FormControl;
  txtInput: FormControl;
  editing: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkCompleted = new FormControl(this.todo.completed);

    this.chkCompleted.valueChanges.subscribe(value => {
      this.store.dispatch(new ToggleTodoCompleted(this.todo.id));
    });
  }

  editTodo() {
    setTimeout(() => {
      this.txtInputReal.nativeElement.select();
    }, 100);
    this.editing = true;
  }

  endEditing() {
    if (this.txtInput.valid && this.txtInput.value !== this.todo.text) {

      this.store.dispatch(new EditTodoAction(this.todo.id, this.txtInput.value));
    }
    this.editing = false;
  }

  destroyTodo() {
    this.store.dispatch(new DestroyTodoAction(this.todo.id));
  }
}
