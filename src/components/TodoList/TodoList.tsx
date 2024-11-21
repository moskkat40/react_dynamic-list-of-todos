import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  fillteredTodos: Todo[];
  setHasTodoClick: (a: boolean) => void;
  hasTodoClick: boolean;
  setUserId: (a: number) => void;
  setTodoId: (a: number) => void;
  todoId: number;
};

export const TodoList: React.FC<Props> = ({
  fillteredTodos,
  setHasTodoClick,
  hasTodoClick,
  setUserId,
  setTodoId,
  todoId,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {fillteredTodos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setHasTodoClick(true);
                  setUserId(todo.userId);
                  setTodoId(todo.id);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye-slash': hasTodoClick || todo.id === todoId,
                      'far fa-eye': !hasTodoClick || todo.id !== todoId,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
