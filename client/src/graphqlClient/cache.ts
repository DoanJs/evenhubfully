import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { EventModel } from "../models/EventModel";
import { AddressModel } from "../models/AddressModel";
import { UserModel } from "../models/UserModel";

export const tokenVar: ReactiveVar<string> = makeVar<string>("");
export const userVar: ReactiveVar<any> = makeVar<any>(null);
export const followersVar: ReactiveVar<EventModel[]> = makeVar<EventModel[]>(
  []
);
export const followingsVar: ReactiveVar<UserModel[]> = makeVar<UserModel[]>(
  []
);
export const currentLocationVar: ReactiveVar<AddressModel | undefined> =
  makeVar<AddressModel | undefined>(undefined);

  
const cache = new InMemoryCache();
export default cache;
