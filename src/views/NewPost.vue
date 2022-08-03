<script lang="ts" setup>
import type { TimelinePost } from "@/posts";
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>"
};
</script>
<template>
  New Post
  <PostWriter :post="post" />
</template>
