import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';

const todo3 = new Todo('Todo 3');

todo3.completed = true;

const initialState: Todo[] = [new Todo('Todo 1'), new Todo('Todo 2'), todo3];

export function todoReducer(state = initialState, action: fromTodo.Actions): Todo[] {
  switch (action.type) {
    case fromTodo.ADD_TODO:
      return [...state, new Todo(action.text)];
    case fromTodo.TOGGLE_COMPLETED_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            completed: !todoEdit.completed
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.EDIT_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            text: action.text
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.DESTROY_TODO:
      return state.filter(todoElement => todoElement.id !== action.id);
    case fromTodo.TOGGLE_COMPLETED_ALL_TODO:
      return state.map(
        todoEdit => {
          return {
            ...todoEdit,
            completed: action.completed
          }
        }
      );
    case fromTodo.DESTROY_COMPLETED_TODOS:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}
