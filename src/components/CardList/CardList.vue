<template>
    <div class="home-page">
        <div class="container sized">
            <Card v-for="(post) in collection" :key="post.id" :post="post" v-on:delete="deletePost"/>
        </div>
        <b-button
            v-if="getRole == 'writer' && currentPage == 1"
            tag="router-link"
            :to="{ name: 'create', params: { id: Math.random() } }"
            type="is-info"
        >Создать</b-button>
        <hr>
        <div class="pagination-wrapper">
            <b-pagination
                :total="allPosts.length"
                :per-page= 10
                :current.sync="currentPage"
                v-on:change="setPage"
            >
            </b-pagination>
        </div>
    </div>
</template>

<script>
    import "regenerator-runtime/runtime";
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Card from '../Card/Card'
    
    export default {
        data() {
            return {
                currentPage: 1,
                pagination: {
                    startIndex: 0,
                    endIndex: 9
                }
            }
        },
        components: { Card },
        computed: {
            ...mapGetters(['allPosts', 'getRole']),
            collection() {
                return this.paginate(this.allPosts);
            }
        },
        methods: {
            ...mapActions(['fetchPosts']),
            ...mapMutations(['deletePost']),
            setPage(page) {
                this.pagination = this.paginator(this.allPosts.length, page)
                window.scrollTo(0, 0)
            },
            paginate(data) {
                return data.slice(this.pagination.startIndex, this.pagination.endIndex + 1)
            },
            paginator(totalItems, currentPage) {
                const startIndex = (currentPage - 1) * 10
                const endIndex = Math.min(startIndex + 10 - 1, totalItems - 1);

                return {
                    currentPage: currentPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                }
            }
        },
        mounted() {
            this.fetchPosts();
        }
    }
</script>

<style scoped>
    .centered {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: unset;
        flex-grow: unset;
        flex-shrink: unset;
    }
    .fixed {
        margin-left: 80%;
        max-width: 20%;
    }
    .sized {
        width: 50%;
    }
    .home-page {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card {
        margin-bottom: 20px;
    }
    hr {
        width: 100%;
    }
    .pagination-wrapper {
        width: 20%;
        display: flex;
        justify-content: center;
    }
</style>