import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const ADD_TODO = 'ADD_TODO'
export const DONE_TOGGLE = 'DONE_TOGGLE'
export const DELETE_TODO = 'DELETE_TODO'

export default new Vuex.Store({
  state: {
    todolist: [
      { todo: '영화보기', done: false },
      { todo: '주말산책', done: true },
      { todo: 'ES6학습', done: false },
      { todo: '잠실야구장', done: false }
    ]
  },
  mutations: {
    [ADD_TODO] (state, payload) {
      if (payload.todo !== '') {
        state.todolist.push({
          todo: payload.todo, done: false
        })
      }
    },
    [DONE_TOGGLE] (state, payload) {
      state.todolist[payload.index].done = !state.todolist[payload.index].done
    },
    [DELETE_TODO] (state, payload) {
      state.todolist.splice(payload.index, 1);
    }
  },
  actions: {

  }
})