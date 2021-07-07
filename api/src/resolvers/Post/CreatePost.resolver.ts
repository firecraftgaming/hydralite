import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { CreatePostArgs } from "./args/CreatePostArgs";
import ContextType from "~/types/Context.type";
import { Post, User } from "~/resolver-types/models";
import { connectIdArray } from "~/util/connectIdArray";
import { ProjectMemberRepo } from "~/db/ProjectMemberRepo";

const memberRepo = new ProjectMemberRepo();
@Resolver()
export class CreatePostResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => Post)
  async createPost(
    @Arg("args") args: CreatePostArgs,
    @Ctx() { req, prisma }: ContextType
  ) {
    // retrieve the currently logged in user
    const user: User = req.user as User;
    const loggedInMember = await memberRepo.findMemberByUserAndProjectId(
      user.id,
      args.projectId
    );

    type postType = Parameters<typeof prisma.post.create>[0]["data"];
    const post: postType = {
      title: args.title,
      description: args.description,
      isAnnouncement: false,
      hashtags: connectIdArray(args.hashtagIds),
      creator: { connect: { id: user.id } },
      type: args.type,
      isPublic: true,
      project: { connect: { id: args.projectId } },
      categories: connectIdArray(args.categoryIds),
      labels: connectIdArray(args.labelIds),
      repostedFrom: { connect: { id: args.repostedFromId } },
    };

    // make sure user can manage posts in this project if they are trying to make an announcement or make a post private
    if (args.isAnnouncement || !args.isPublic || args.visibleToRolesIds)
      memberRepo.memberHasPermission(loggedInMember!, "canModeratePosts");

    post.isPublic = args.isPublic || false;
    post.visibleTo = post.isPublic
      ? connectIdArray(args.visibleToRolesIds)
      : {};

    post.isAnnouncement = args.isAnnouncement || false;

    const createdPost = await prisma.post.create({ data: post });
    return createdPost;
  }
}
