<template>
    <form @submit.prevent="submit">
        <b-field label="Заголовок поста">
            <b-input v-model="title" class="edit-title"></b-input>
        </b-field>
        <b-field label="Текст поста" class="edit-field">
            <b-input
            maxlength="200" 
            type="textarea" 
            class="edit-input"
            v-model="description"></b-input>
        </b-field>
        <b-button @click="submit">{{ isEditor ? 'Сохранить' : 'Создать' }} пост</b-button>
    </form>
</template>

<script>
import { mapMutations } from 'vuex'
    export default {
        data() {
            const currentPost = this.$store.getters.getPost(this.$route.params.id)
            return {
                isEditor: this.$route.name === 'edit',
                title: !this.isEditor ? currentPost.title : '',
                description: !this.isEditor? currentPost.description : ''
            }
        },
        methods: {
            ...mapMutations(['createPost', 'updatePost']),
            submit() {
                if (this.isEditor) {
                    this.updatePost({ 
                        title: this.title, 
                        description: this.description, 
                        id: this.$route.params.id,
                        updatedAt: new Date().toJSON()
                    })
                } else {
                    this.createPost({
                        title: this.title,
                        description: this.description,
                        id: Math.random(),
                        createdAt: new Date().toJSON()
                    })
                }
                this.$router.push('/')
            }
        },
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .edit-field {
        width: 50%;
    }
    .edit-title {
        width: 100%;
    }
</style>