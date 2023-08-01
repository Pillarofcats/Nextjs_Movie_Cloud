import iUser from "@/interface/user";

export default interface iUserContext {
  storeUser: iUser
  setStoreUser: React.Dispatch<React.SetStateAction<iUser>>
}