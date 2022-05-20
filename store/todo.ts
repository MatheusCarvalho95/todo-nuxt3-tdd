import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export interface ITodo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoState {
  items: ITodo[] | undefined[];
}

export interface IAddTodo {
  title: string;
}

export interface ITodoUpdate {
  title?: string;
  done?: boolean;
}
const state = (): ITodoState => ({
  items: [],
});

const getters = {
  getById: (state: ITodoState) => (id: string) => {
    return state.items.find((item: ITodo) => item.id === id);
  },
  getOrderedTodos: (state: ITodoState) =>
    state.items.sort(
      (a: ITodo, b: ITodo) =>
        a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds(),
    ),
};

const actions = {
  add(partialTodo: IAddTodo) {
    const todo: ITodo = {
      ...partialTodo,
      id: uuid(),
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(todo);
  },

  remove(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  },

  update(id: string, update: ITodoUpdate) {
    this.items = this.items.map((item: ITodo) =>
      item.id === id ? { ...item, ...update, updatedAt: new Date() } : item,
    );
  },
};

export const useTodoStore = defineStore("todoStore", {
  state,
  getters,
  actions,
});
