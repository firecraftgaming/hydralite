import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { IsAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { Interest } from "~/resolver-types/models";
import ContextType from "~/types/Context.type";
import executeOrFail from "~/util/executeOrFail";
import { FindInterestsInMassArgs } from "./args/FindInterestsInMassArgs";

@Resolver()
export class FindInterestsInMassResolver {
  @Mutation(() => Interest)
  @IsAuthenticated()
  async findInterestsInMass(
    @Arg("args") { queryString, limit, skip }: FindInterestsInMassArgs,
    @Ctx() { prisma }: ContextType
  ) {
    const returnedInterests = await executeOrFail(
      async () =>
        await prisma.$queryRaw(
          `SELECT * FROM Interest
            WHERE to_tsvector(name) @@ to_tsquery($1)
            OFFSET $2
            LIMIT $3`,
          queryString,
          skip ?? 0,
          limit && limit < 100 && limit > 0 ? limit : 20
        )
    );

    return returnedInterests;
  }
}
