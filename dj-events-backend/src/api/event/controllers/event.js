"use strict";

/**
 *  event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  count(ctx) {
    const { query } = ctx.request;
    return strapi.query("api::event.event").count({ where: query });
  },
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const query = {
      filters: {
        user: { id: user.id },
      },
    };
    const data = await this.find({ query: query });
    if (!data) {
      return ctx.notFound();
    }
    const sanitizedEntity = await this.sanitizeOutput(data, ctx);
    return this.transformResponse(sanitizedEntity);
  },
  // Create user event----------------------------------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await super.create(ctx);
    return entity;
  },

  // Update user event----------------------------------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });

    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);

    console.log(JSON.stringify(entity));
    return entity;
  },
  // Delete a user event----------------------------------------
  async delete(ctx) {
    const { id } = ctx.req.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },
}));
