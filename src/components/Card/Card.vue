<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ post.title }}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <p>{{ post.description }}</p>
                <time>Создан: {{ timeValidate(post.createdAt) }}</time>
                <time v-if="post.updatedAt">Обновлен: {{ timeValidate(post.updatedAt) }}</time>
            </div>
        </div>
        <footer class="card-footer" v-if="getRole != 'unloged'">
            <b-button
            v-if="getRole == 'reader'"
            @click="post.claps++"
            icon-right="account" 
            type="is-success" 
            size="is-large" 
            class="card-footer-item fixed"
            >
                <span>{{ post.claps }}</span>
            </b-button>
            <router-link 
            v-if="getRole == 'writer'"
            :to="{ name: 'edit', params: { id: post.id } }"
            class="card-footer-item"
            >
            Редактировать
            </router-link>
            <b-button
            v-if="getRole == 'writer'"
            size="is-large" 
            type="is-danger" 
            icon-right="delete" 
            class="card-footer-item"
            v-on:click="$emit('delete', post.id)"
            />
        </footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: {
            post: Object,
            delete: Function
        },
        computed: {
            ...mapGetters(['getRole'])
        },
        methods: {
            timeValidate(val) {
                return val.slice(0, 16).replace(/-/g, '/').replace(/T/g, ' в ')
            }
        },
    }
</script>

<style lang="scss">
    .content time {
        margin-right: 10px;
    }

    .card {

        &-header-title {
            background-color: #c3eadf;
        }

        button {
            transition: all 0.4s ease;
            
            &:hover {
                opacity: 0.6;
            }

            &:active {
                transform: scale(0.8);
            }
        }
    }
</style>