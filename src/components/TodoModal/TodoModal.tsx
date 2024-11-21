import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../services/users';
import { User } from '../../types/User';

type Props = {
  setHasTodoClick: (a: boolean) => void;
  fillteredTodos: Todo[];
  userId: number;
  todoId: number;
  loading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  setHasTodoClick,
  fillteredTodos,
  userId,
  todoId,
  loading,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  function handleCloseButton() {
    setHasTodoClick(false);
  }

  const selectTodo = fillteredTodos.find(todo => todo.id === todoId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectTodo && !user && !loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
