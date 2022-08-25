"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", {
  count(ctx) {
    var { query } = ctx.request;
    return strapi.query("api::event.event").count({ where: query });
  },
});
