import {
    TODO_SEARCH,
    TODO_SET
} from "../actions/todo";
import axios from "../../utils/api";
  
const state = {
    todosSearch: [],
};
  
const actions = {
    [TODO_SEARCH]: ({commit},{payload}) => {
        return new Promise((resolve, reject) => {
            axios({ url: `todo/user?q=${payload}&&filter=all`, method: "GET" })
                .then(({ data: { data } }) => {
                    commit(TODO_SET, data.sort((a,b) => (a.isDone > b.isDone) ? 1 : ((b.isDone > a.isDone) ? -1 : 0)));
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};
  
const mutations = {
    [TODO_SET]: (state, data) => {
        state.todosSearch = data;
    },
};
  
export default {
    state,
    actions,
    mutations
};
