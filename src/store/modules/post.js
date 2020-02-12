export default {
    actions: {
        async fetchPosts({ commit }, page = 1) {
            const res = await fetch(`http://localhost:3000/posts?_page=${page}&_limit=10`)
            const posts = await res.json()
            commit('updatePosts', posts)
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = [...state.posts, ...posts].reduce((newPosts, el) => (
                !(newPosts.findIndex(post => post.id === el.id) + 1) ? [...newPosts, el] : newPosts
            ), []);
        },
        createPosts(state, newPost) {
            state.posts = [newPost, ...state.posts];
        },
        updatePost(state, newData) {
            const selectedPostIndex = state.posts.findIndex(el => el.id === newData.id)
            const selectedPost = state.posts[selectedPostIndex]
            state.posts[selectedPostIndex] = { ...selectedPost, ...newData };
        },
        deletePost(state, postId) {
            state.posts.splice(state.posts.findIndex(el => el.id === postId), 1)
        }
    },
    state: {
        posts: []
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        getPost: (state) => (id) => {
            return state.posts.find(el => el.id === id);
        },
        getCurrentPage(state) {
            return state.page
        }
    }
}