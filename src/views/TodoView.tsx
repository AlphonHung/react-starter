import React from 'react';
import TodoListSet from '~/components/TodoListSet'

/** 單純用來示範router的view */
const TodoView = () => (
    <div>
        <div className="display-3">展示Todo</div>
        <TodoListSet />
    </div>
)

export default TodoView;