interface Vote {
  userID: string,
  voteCount: number // -1 or +1
}

export interface Note {
  userID: string,
  noteContent: string,
  votes: number,
  voters: Array<Vote>
}
