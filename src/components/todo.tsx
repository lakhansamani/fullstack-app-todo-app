import { useAuthorizer } from "@authorizerdev/authorizer-react";
import { gql, useQuery, useMutation } from "urql";
const TodosQuery = gql`
  query {
    todo {
      id
      name
      is_completed
    }
  }
`;

const InsertTodo = gql`
  mutation ($data: todo_insert_input!) {
    insert_todo_one(object: $data) {
      id
      name
      is_completed
    }
  }
`;

const UpdateTodo = gql`
  mutation ($id: uuid!, $is_completed: Boolean!) {
    update_todo(
      where: { id: { _eq: $id } }
      _set: { is_completed: $is_completed }
    ) {
      affected_rows
    }
  }
`;

interface TodoType {
  id: string;
  name: string;
  is_completed: boolean;
}

export default function Todo() {
  const { user } = useAuthorizer();
  const [queryResult, reexecuteQuery] = useQuery({
    query: TodosQuery,
    requestPolicy: "network-only",
  });
  const [insertTodoResult, insertTodo] = useMutation(InsertTodo);
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = e.currentTarget.todo.value;
    console.log(todo);
    // write the mutation to add todo here
    await insertTodo({
      data: {
        name: todo,
        user_id: user?.id,
        is_completed: false,
      },
    });
    reexecuteQuery();
    e.currentTarget.reset();
  };

  const handleUpdate = async (id: string, is_completed: boolean) => {
    // write the mutation to update todo here
    await updateTodo({
      id,
      is_completed,
    });
    reexecuteQuery();
  };
  if (queryResult.fetching) return <h1>Loading...</h1>;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="todo" name="todo" id="todo" />
        <button type="submit" disabled={insertTodoResult.fetching}>
          Save
        </button>
      </form>
      {queryResult.data.todo.length === 0 ? (
        <p>no todos</p>
      ) : (
        <>
          {queryResult.data.todo.map((todo: TodoType) => {
            return (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    textDecoration: todo.is_completed ? "line-through" : "none",
                  }}
                >
                  {todo.name}
                </div>
                <button
                  onClick={() => {
                    handleUpdate(todo.id, !todo.is_completed);
                  }}
                  disabled={updateTodoResult.fetching}
                >
                  {todo.is_completed
                    ? "mark as remaining"
                    : "mark as completed"}
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
