import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateRoomSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const RoomRouter = router({
  //Room Request Service
  createOne: protectedProcedure
    .input(ZCreateRoomSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.room.create({
        data: input,
      });
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get a room request

      return ctx.db.room.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // get all room requests
    return ctx.db.room.findMany({
      include: {
        service: true,
      },
    });
  }),
  deleteOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete a room request
      await ctx.db.room.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "Room request deleted" };
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    // delete all room requests
    await ctx.db.room.deleteMany({});

    return { message: "All room requests deleted" };
  }),
  deleteMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete multiple room requests
      await ctx.db.room.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      return { message: "Room requests deleted" };
    }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateRoomSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.room.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateRoomSchema.partial(),
          type: z.literal("room").default("room"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.room.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),
});
