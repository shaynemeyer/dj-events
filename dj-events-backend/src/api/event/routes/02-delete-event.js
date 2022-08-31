module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/events/:id",
      handler: "event.delete",
      config: {
        policies: [],
      },
    },
  ],
};
