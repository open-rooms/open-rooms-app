// Define your default tags
export const DEFAULT_TAG: string[] = ['g', 'open-rooms'];
export const USER_TAG: string[] = ['t', 'user'];
export const ROOM_TAG: string[] = ['t', 'room'];
export const PROPOSAL_TAG: string[] = ['t', 'proposal'];
export const VOTE_TAG: string[] = ['t', 'vote'];

// Define functions to generate tags with dynamic parts
export function getRoomIdTag(roomId: string): string[] {
  return ['e', roomId];
}

export function getProposalIdTag(proposalId: string): string[] {
  return ['e', proposalId];
}

// Usage:
// const roomIdTag = getRoomIdTag('some-room-id');
// const proposalIdTag = getProposalIdTag('some-proposal-id');
