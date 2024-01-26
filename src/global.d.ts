declare global {
  interface IContact  {
    first?: string,
    last: string,
    avatar: string | undefined,
    twitter: string,
    notes: string,
    favorite: boolean
  }
}