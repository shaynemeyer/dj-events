module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/events/:id",
      handler: "event.update",
      config: {
        policies: [],
      },
    },
  ],
};
