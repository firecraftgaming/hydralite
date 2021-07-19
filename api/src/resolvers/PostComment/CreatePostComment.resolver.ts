import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { CreatePostCommentArgs } from "./args/CreatePostCommentArgs";
import ContextType from "~/types/Context.type";
import { PostComment, User } from "~/resolver-types/models";

@Resolver()
export class CreatePostCommentResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => PostComment)
  async createPostComment(
    @Arg("args") args: CreatePostCommentArgs,
    @Ctx() { req, prisma }: ContextType
  ) {
    // retrieve the currently logged in user
    const user: User = req.user as User;

    type postCommentType = Parameters<typeof prisma.postComment.create>[0]["data"];
    const postComment: postCommentType = {
      body: args.body,
      creator: { connect: { id: user.id } },
      post: { connect: { id: args.postId } }
    };

    const createdPostComment = await prisma.postComment.create({ data: postComment });
    return createdPostComment;
  }
}