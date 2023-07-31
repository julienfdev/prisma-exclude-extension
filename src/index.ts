import { Prisma } from "@prisma/client";

type Without<T extends Record<string, any>, U> = {
  [P in keyof T]: P extends keyof U ? never : P;
};

type PickedKeys<T extends Record<string, any>> = T[keyof T];

export const excludePrisma = Prisma.defineExtension((client) =>
  client.$extends({
    model: {
      $allModels: {
        async findFirstExclude<T, K extends Prisma.Args<T, "findFirst">["select"]>(
          this: T,
          args: Omit<Prisma.Args<T, "findFirst">, "select"> & {
            exclude?: K;
          }
        ) {
          const exclude = { ...args.exclude };
          delete args.exclude;
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findFirst(args);

          if (typeof result === "object" && result !== null) {
            Object.keys(exclude).forEach((value) => delete result[value]);
          }

          return result as Pick<NonNullable<Prisma.Result<T, null, "findFirst">>, PickedKeys<Without<NonNullable<Prisma.Result<T, null, "findFirst">>, K>>> | null;
        },
        async findFirstOrThrowExclude<T, K extends Prisma.Args<T, "findFirst">["select"]>(
          this: T,
          args: Omit<Prisma.Args<T, "findFirstOrThrow">, "select"> & {
            exclude?: K;
          }
        ) {
          const exclude = { ...args.exclude };
          delete args.exclude;
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findFirstOrThrow(args);

          if (typeof result === "object" && result !== null) {
            Object.keys(exclude).forEach((value) => delete result[value]);
          }

          return result as Pick<Prisma.Result<T, null, "findFirstOrThrow">, PickedKeys<Without<Prisma.Result<T, null, "findFirstOrThrow">, K>>>;
        },
        async findUniqueExclude<T, K extends Prisma.Args<T, "findUnique">["select"]>(
          this: T,
          args: Omit<Prisma.Args<T, "findUnique">, "select"> & {
            exclude?: K;
          }
        ) {
          const exclude = { ...args.exclude };
          delete args.exclude;
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findUnique(args);

          if (typeof result === "object" && result !== null) {
            Object.keys(exclude).forEach((value) => delete result[value]);
          }

          return result as Pick<NonNullable<Prisma.Result<T, null, "findUnique">>, PickedKeys<Without<NonNullable<Prisma.Result<T, null, "findUnique">>, K>>> | null;
        },
        async findUniqueOrThrowExclude<T, K extends Prisma.Args<T, "findUniqueOrThrow">["select"]>(
          this: T,
          args: Omit<Prisma.Args<T, "findUniqueOrThrow">, "select"> & {
            exclude?: K;
          }
        ) {
          const exclude = { ...args.exclude };
          delete args.exclude;
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findUniqueOrThrow(args);

          if (typeof result === "object" && result !== null) {
            Object.keys(exclude).forEach((value) => delete result[value]);
          }

          return result as Pick<Prisma.Result<T, null, "findUniqueOrThrow">, PickedKeys<Without<Prisma.Result<T, null, "findUniqueOrThrow">, K>>>;
        },
        async findManyExclude<T, K extends Prisma.Args<T, "findMany">["select"]>(
          this: T,
          args: Omit<Prisma.Args<T, "findMany">, "select"> & {
            exclude?: K;
          }
        ) {
          const exclude = { ...args.exclude };
          delete args.exclude;
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findMany(args);

          if (Array.isArray(result)) {
            for (const item of result) {
              Object.keys(exclude).forEach((value) => delete item[value]);
            }
          }

          return result as Pick<NonNullable<Prisma.Result<T, null, "findFirst">>, PickedKeys<Without<NonNullable<Prisma.Result<T, null, "findFirst">>, K>>>[];
        },
      },
    },
  })
);
