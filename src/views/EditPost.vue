<script lang="ts" setup>
import PostWriter from "../components/PostWriter.vue";
import { usePosts } from "../stores/posts";
import { useRoute, useRouter } from "vue-router";
import type { PostI } from "../posts";

const route = useRoute();
const router = useRouter();
const postsStore = usePosts();

const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

async function handleSubmit(post: PostI) {
  await postsStore.updatePost(post);
  router.push("/");
}
</script>
<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
