import { publicProcedure, protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateAvSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";
export const avRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateAvSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.aV.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.aV.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aV.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.aV.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateAvSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aV.update({
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
          data: ZCreateAvSchema.partial(),
          type: z.literal("av").default("av"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aV.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.aV.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.aV.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
