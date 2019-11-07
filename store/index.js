
import { serverHttp } from '../config/default.json'

export const strict = false; // Обязательная переменная. Позволяет использовать Дату для форм.

export const state = () => ({
    _Auth: false,
    _ServerHttp: serverHttp
});


export const mutations = {
    setAuth(state, bull){
        bull ? state._Auth = true : state._Auth = false;
    }
}