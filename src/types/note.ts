interface Vote {
  uid: string,
  rating: number // -1 or +1
}

export interface Note {
  body: string,
  author: string,
  voters: Array<Vote>
}
