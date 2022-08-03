import { defineStore } from "pinia";
import type { PostI, TimelinePost } from "../posts";
import type { Period } from "../constants";
import { today, thisMonth, thisWeek } from "../posts";
import { DateTime } from "luxon";

interface PostsState {
  ids: string[]; // ["1", "2"]
  all: Map<string, PostI>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    async fetchPosts() {
      const res = await window.fetch("http://localhost:8000/posts");
      const data = (await res.json()) as PostI[];
      await delay();
      const ids: string[] = [];
      const all = new Map<string, PostI>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },

    createPost(post: TimelinePost) {
      const body = JSON.stringify({ ...post, created: post.created.toISO() });
      return window.fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`);
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === "This week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});
