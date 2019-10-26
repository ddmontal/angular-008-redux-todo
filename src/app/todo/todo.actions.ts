import { Action } from '@ngrx/store';

export const ADD_TODO = '[TODO] Add Todo';
export const EDIT_TODO = '[TODO] Edit Todo';
export const DESTROY_TODO = '[TODO] Destroy Todo';
export const DESTROY_COMPLETED_TODOS = '[TODO] Destroy completed Todos';
export const TOGGLE_COMPLETED_TODO = '[TODO] Toggle completed todo';
export const TOGGLE_COMPLETED_ALL_TODO = '[TODO] Toggle completed all todos';

export class AddTodoAction implements Action {
  readonly type = ADD_TODO;

  constructor(public text: string) {}
}

export class ToggleTodoCompleted implements Action {
  readonly type = TOGGLE_COMPLETED_TODO;
  constructor(public id: number) {}
}

export class ToggleTodoAllCompletedAction implements Action {
  readonly type = TOGGLE_COMPLETED_ALL_TODO;
  constructor(public completed: boolean) {}
}

export class EditTodoAction implements Action {
  readonly type = EDIT_TODO;
  constructor(public id: number, public text: string) {}
}

export class DestroyTodoAction implements Action {
  readonly type = DESTROY_TODO;
  constructor(public id: number) {}
}

export class DestroyCompleteTodosAction implements Action {
  readonly type = DESTROY_COMPLETED_TODOS;
}

export type Actions =
  | AddTodoAction
  | ToggleTodoCompleted
  | EditTodoAction
  | DestroyTodoAction
  | DestroyCompleteTodosAction
  | ToggleTodoAllCompletedAction;
