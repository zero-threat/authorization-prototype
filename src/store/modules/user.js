export default {
    actions: {
        async fetchUser({ commit }, { login, password }) {
            try {
                const res = await fetch('http://localhost:3000/users?' + `login=${login}&password=${password}`);
                const user = await res.json()

                if (user.length === 1) {
                    commit('login', user[0])
                } else {
                    throw '400'
                }
            } catch (e) {
                commit('loginError', e)
                throw e;
            }
        }
    },
    mutations: {
        login(state, user) {
            state.current = { ...state, ...user };
            state.isError = false
        },
        loginError(state, error) {
            state.isError = true
            state.error = error
        }
    },
    state: {
        current: {
            role: 'unloged',
        }
    },
    getters: {
        getLoginStatus(state) {
            return !state.isError
        },
        getRole(state) {
            return state.current.role
        }
    }
}