import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure
} from "~/server/api/trpc";

// Creación del enrutador para la funcionalidad relacionada con las mascotas
export const userRouter = createTRPCRouter({
  // Método para obtener las mascotas
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    ctx.session?.user.id;
    try {
      const user = await ctx.prisma.user.findMany({});

      return user;
    } catch (error) {
      // Manejo de errores: devuelve un mensaje de error al usuario
      console.error(error);
      throw new Error(
        "Ocurrió un error al obtener los usuarios. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }),

  // Método para obtener las mascotas por Id
getUserById: publicProcedure
.input(z.object({ userId: z.string() }))
.query(async ({ ctx, input }) => {
  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userId,
      },
    });

    if (!user) {
      throw new Error("No se encontró el usuario solicitado.");
    }
    return {
      success: true,
      message: "Usuario encontrado exitosamente.",
      data: user,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Ocurrió un error al obtener la mascota. Por favor, inténtalo de nuevo más tarde."
    );
  }
}),

});
