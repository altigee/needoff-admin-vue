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
