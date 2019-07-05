import { request } from "./gql";

export async function getWorkspaces() {
  const res = await request(/* GraphQL */ `
    {
      myWorkspaces {
        id
        name
        description
        invitationLinkToken
      }
    }
  `);

  return res.myWorkspaces;
}

export async function createWorkspace({ name, description, members = [] }) {
  const res = await request(/* GraphQL */ `
    mutation {
      createWorkspace(
        name: "${name}",
        description: "${description}",
        members: ${JSON.stringify(members)}
      ) {
        ws {
          id
        }
      }
    }
  `);

  return res.createWorkspace.ws;
}

export async function getWorkspace(workspaceId) {
  const res = await request(/* GraphQL */ ` {
    workspaceById(workspaceId: ${workspaceId}) {
      name
      description
    }
  }`);

  return res.workspaceById;
}

export function getWorkspaceCalendar(workspaceId) {
  return request(/* GraphQL */ `{
    workspaceById(workspaceId: ${workspaceId}) {
      name
      description
    }
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
}

export async function getWorkspaceMembers(workspaceId) {
  const res = await request(/* GraphQL */ `
    {
      workspaceMembers(workspaceId: ${workspaceId}) {
        userId
        startDate
        profile {
          firstName
          lastName
          email
        }
        balance {
          leftPaidLeaves
          totalPaidLeaves
          leftUnpaidLeaves
          totalUnpaidLeaves
          leftSickLeaves
          totalSickLeaves
        }
      }
    }
  `);

  return res.workspaceMembers;
}

export async function getUserLeaves(workspaceId, userId) {
  const res = await request(/* GraphQL */ ` {
    userLeaves(workspaceId: ${workspaceId}, userId: ${userId}) {
      id
      startDate
      endDate
      leaveType
      comment
      approvedBy {
        userId
        firstName
        lastName
        position
      }
    }
  }`);

  return res.userLeaves;
}
