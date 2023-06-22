import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// Creación del enrutador para la funcionalidad relacionada con las mascotas
export const petRouter = createTRPCRouter({
  // Método para obtener las mascotas
  getAllPets: publicProcedure.query(async ({ ctx }) => {
    ctx.session?.user.id;
    try {
      const pet = await ctx.prisma.pet.findMany({});

      return pet;
    } catch (error) {
      // Manejo de errores: devuelve un mensaje de error al usuario
      console.error(error);
      throw new Error(
        "Ocurrió un error al obtener las mascotas. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }),

  // Método para obtener las mascotas por Id
getPetById: publicProcedure
.input(z.object({ petId: z.number() }))
.query(async ({ ctx, input }) => {
  try {
    const pet = await ctx.prisma.pet.findUnique({
      where: {
        id: input.petId,
      },
    });

    if (!pet) {
      throw new Error("No se encontró la mascota solicitada.");
    }

    return {
      success: true,
      message: "Mascota encontrada exitosamente.",
      data: pet,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Ocurrió un error al obtener la mascota. Por favor, inténtalo de nuevo más tarde."
    );
  }
}),


  // Método para obtener las mascotas adoptadas
  getAdoptedPets: publicProcedure.query(async ({ ctx }) => {
    try {
      const adoptedPets = await ctx.prisma.pet.findMany({
        where: { adopted: true },
      });

      return adoptedPets;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Ocurrió un error al obtener las mascotas adoptadas. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }),

  // Método para obtener las mascotas disponibles
  getAvailablePets: publicProcedure.query(async ({ ctx }) => {
    try {
      const availablePets = await ctx.prisma.pet.findMany({
        where: { adopted: false },
      });

      return availablePets;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Ocurrió un error al obtener las mascotas disponibles. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }),

  // Método para crear las mascotas
  createPet: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.string(),
        category: z.string(),
        description: z.string(),
        image: z.string(),
        weight: z.string(),
        adopted: z.boolean(),
        gender: z.string(),
        breed: z.string(),
        characteristics: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.id },
        });

        if (!user || !user.isAdmin) {
          throw new Error(
            "No tienes permisos para crear mascotas, solo los administradores pueden hacerlo."
          );
        }

        const newPet = await ctx.prisma.pet.create({
          data: {
            name: input.name,
            age: input.age,
            category: input.category,
            gender: input.gender,
            description: input.description,
            image: input.image,
            weight: input.weight,
            adopted: input.adopted,
            breed: input.breed,
            characteristics: input.characteristics,
            User: { connect: { id: user.id } }, // Add the User argument here
          },
        });

        if (!newPet) {
          throw new Error("No se pudo crear la mascota. Inténtalo de nuevo.");
        }

        return {
          success: true,
          message: "La mascota se ha creado exitosamente.",
          pet: newPet,
        };
      } catch (error) {
        console.error(error);
        throw new Error(
          "Ocurrió un error al crear la mascota. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }),

  // Método para eliminar una mascota
  deletePet: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.id },
        });

        if (!user || !user.isAdmin) {
          throw new Error(
            "No tienes permisos para eliminar mascotas, solo los administradores pueden hacerlo."
          );
        }

        const deletedPet = await ctx.prisma.pet.delete({
          where: { id: input.id },
        });

        if (!deletedPet) {
          throw new Error(
            "No se pudo eliminar la mascota. Inténtalo de nuevo."
          );
        }

        return {
          success: true,
          message: "La mascota se ha eliminado exitosamente.",
        };
      } catch (error) {
        console.error(error);
        throw new Error(
          "Ocurrió un error al eliminar la mascota. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }),

  // Método para actualizar una mascota
  updatePet: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        age: z.string(),
        category: z.string(),
        description: z.string(),
        image: z.string(),
        weight: z.string(),
        adopted: z.boolean(),
        gender: z.string(),
        breed: z.string(),
        characteristics: z.string(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.id },
        });

        if (!user || !user.isAdmin) {
          throw new Error(
            "No tienes permisos para actualizar mascotas, solo los administradores pueden hacerlo."
          );
        }

        const updatedPet = await ctx.prisma.pet.update({
          where: { id: input.id },
          data: {
            name: input.name,
            age: input.age,
            category: input.category,
            gender: input.gender,
            description: input.description,
            image: input.image,
            weight: input.weight,
            adopted: input.adopted,
            breed: input.breed,
            characteristics: input.characteristics,
          },
        });

        if (!updatedPet) {
          throw new Error(
            "No se pudo actualizar la mascota. Inténtalo de nuevo."
          );
        }

        return {
          success: true,
          message: "La mascota se ha actualizado exitosamente.",
          pet: updatedPet,
        };
      } catch (error) {
        console.error(error);
        throw new Error(
          "Ocurrió un error al actualizar la mascota. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }),
});
