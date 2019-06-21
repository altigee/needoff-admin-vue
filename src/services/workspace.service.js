import { request } from "./gql";

export async function getWorkspaces() {
  const res = await request(`{
    myWorkspaces { 
      id
      name
      description
      invitationLinkToken
    }
  }`);

  return res.myWorkspaces;
}

export async function getTeamCalendar(workspaceId) {
  const res = await request(`{
    teamCalendar(workspaceId: ${workspaceId}) {
      id
      leaveType
      startDate
      endDate
      approvedBy {
        userId
        firstName
        lastName
      }
      user {
        userId
        firstName
        lastName
      }
      comment
    }
  }`);

  return res.teamCalendar;
}
