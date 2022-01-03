import { objectType, extendType, nonNull, stringArg, intArg, inputObjectType, enumType, arg, list } from "nexus";
import { Prisma, LinkOrderByWithRelationInput } from "@prisma/client";

export const Feed = objectType({
    name: "Feed",
    definition(t) {
        t.nonNull.list.nonNull.field("links", { type: Link }); // 1
        t.nonNull.int("count"); // 2
    },
});

export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
        t.nonNull.dateTime("createdAt");  // 1
        t.field("postedBy", {   // 1
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        });
        t.nonNull.list.nonNull.field("voters", {  // 1
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .voters();
            }
        }); 
    },
});

export const LinkOrderByInput = inputObjectType({
    name: "LinkOrderByInput",
    definition(t) {
        t.field("description", { type: Sort });
        t.field("url", { type: Sort });
        t.field("createdAt", { type: Sort });
    },
});

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"],
});


export const LinkQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.field("feed", {   // 3
            type: "Feed",
            args: {
                filter: stringArg(),   // 1
                skip: intArg(),   // 1
                take: intArg(),   // 1 
                orderBy: arg({type: list(nonNull(LinkOrderByInput))})
            },
            async resolve(parent, args, context, info) {    // 4
                const where = args.filter   // 2
                ? {
                      OR: [
                          { description: { contains: args.filter } },
                          { url: { contains: args.filter } },
                      ],
                  }
                : {};

                const links = await context.prisma.link.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                    orderBy: args?.orderBy as Prisma.Enumerable<LinkOrderByWithRelationInput> | undefined,
                });

                const count = await context.prisma.link.count({ where });

                return {
                    links,
                    count,
                };
            },
        });
    },
});

export const LinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Link",  
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const { description, url } = args;  // 4
                const { userId } = context;
                
                if (!userId) {
                    throw new Error("Cannot post without logging in.");
                }

                const newLink = context.prisma.link.create({
                    data: {
                        description,
                        url,
                        postedBy: { connect: {id: userId}},
                    }
                })
                return newLink;
            },
        });
    },
});
