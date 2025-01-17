import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import ContextType from "~/types/Context.type";
import { IsAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { CreateMemberRoleArgs } from "./args/CreateMemberRoleArgs";
import { MemberRole, User } from "~/resolver-types/models";
import { ProjectMemberRepo } from "~/db/ProjectMemberRepo";

const memberRepo = new ProjectMemberRepo();
@Resolver()
export default class CreateMemberRoleResolver {
  @Mutation(() => MemberRole)
  @IsAuthenticated()
  async createMemberRole(
    @Arg("args") args: CreateMemberRoleArgs,
    @Ctx() { req, prisma }: ContextType
  ): Promise<MemberRole | null> {
    // retrieve the currently logged in user
    const user: User = req.user as User;

    // retrieve and confirm loggedInMember exists
    const loggedInMember = await memberRepo.findMemberByUserAndProjectId(
      user.id,
      args.projectId
    );

    // ensure loggedInMember has required permissions
    await memberRepo.memberHasPermission(loggedInMember!, "canManageRoles");

    const createdRole = await prisma.MemberRole.create({
      data: {
        title: args.title,
        description: args.description || "",
        permissions: {
          create: {
            canAccessBugReports: !!args.canAccessBugReports,
            canAccessFeatureRequests: !!args.canAccessFeatureRequests,
            canCreateProjectAnnouncements: !!args.canCreateProjectAnnouncements,
            canGenerateProjectInvites: !!args.canGenerateProjectInvites,
            canManageFundraisers: !!args.canManageFundraisers,
            canManageProjectGroups: !!args.canManageProjectGroups,
            canManageProjectSurveys: !!args.canManageProjectSurveys,
            canManageProjectWaitlists: !!args.canManageProjectWaitlists,
            canManageRoadmap: !!args.canManageRoadmap,
            canManageRoles: !!args.canManageRoles,
            canManageTasks: !!args.canManageTasks,
            canManageTesterOutsourcing: !!args.canManageTesterOutsourcing,
            canManageThirdPartyApps: !!args.canManageThirdPartyApps,
            canManageUsers: !!args.canManageUsers,
            canManagePosts: !!args.canManagePosts,
            canScheduleRooms: !!args.canScheduleRooms,
            canViewDeveloperInsights: !!args.canViewDeveloperInsights,
            canViewLogs: !!args.canViewLogs,
            canViewProjectInsights: !!args.canViewProjectInsights,
            canViewRoadmap: !!args.canViewRoadmap,
            canWriteDeveloperReviews: !!args.canWriteDeveloperReviews,
          },
        },
        project: {
          connect: {
            id: args.projectId,
          },
        },
        assignedMembers: {}, // TASK: Allow the ability to specify member id's that can get this role
      },
    });

    return createdRole;
  }
}
