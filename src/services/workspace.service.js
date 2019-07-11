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

export async function getWorkspaceMembersList(workspaceId) {
  const res = await request(/* GraphQL */ `
    {
      workspaceMembers(workspaceId: ${workspaceId}) {
        profile {
          userId
          firstName
          lastName
          email
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

export async function addWorkspaceMember({ workspaceId, member }) {
  const res = await request(/* GraphQL */ `
    mutation {
      addWorkspaceMember(
        email: "${member.email}",
        wsId: ${workspaceId}
      ) {
        ok
      }
    }`);

  return res.addWorkspaceMember;
}

export async function getLeaves(wsId) {
  const res = await request(/* GraphQL */ `
    {
      dayOffs(workspaceId: ${wsId}) {
        id
        leaveType
        user {
          userId
          firstName
          lastName
          email
        }
        comment
        startDate
        endDate
        approvedBy {
          userId
          firstName
          lastName
          email
        }
      }
    }
  `);

  return res.dayOffs;
}

export async function createLeave(leave) {
  const res = await request(/* GraphQL */ `
    mutation {
      createDayOff(
        startDate: "${leave.startDate}", 
        endDate: "${leave.endDate}", 
        type: "${leave.type}", 
        workspaceId: ${leave.workspaceId},
        userId: ${leave.userId},
        comment: "${leave.comment}") {
        errors
        warnings
        notes
        dayOff {
          id
        }
      }
    }`);

  return res.createDayOff;
}

export async function approveLeave(leaveId) {
  const res = await request(/* GraphQL */ `mutation {
    approveDayOff(dayOffId:${leaveId}){
      ok
      dayOff {
        id
        approvedBy {
          userId
          firstName
          lastName
          email
        }
      }
    }
  }`);

  return res.approveDayOff;
}
