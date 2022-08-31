"use strict";

/**
 * `assign-owner` middleware.
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.request.body.data.user = ctx.state.user;

    await next();
  };
};
