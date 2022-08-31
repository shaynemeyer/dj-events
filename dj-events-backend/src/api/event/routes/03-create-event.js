module.exports = {
  routes: [
    {
      method: "POST",
      path: "/events",
      handler: "event.create",
      config: {
        policies: [],
      },
    },
  ],
};
