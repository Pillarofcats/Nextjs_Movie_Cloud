export default interface iUser {
  id: string,
  name: string,
  image: string,
  email: string,
  emailVerified?: null,
  hashPassword?: null,
  createdAt: Date,
  updatedAt: Date,
  favoriteIds: string[]
}