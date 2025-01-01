import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { AddressModel } from "../models/AddressModel";
import { EventModel } from "../models/EventModel";
import { UserModel } from "../models/UserModel";

export const tokenVar: ReactiveVar<string> = makeVar<string>("");
export const userVar: ReactiveVar<UserModel | undefined> = makeVar<
  UserModel | undefined
>(undefined);
export const followEventsVar: ReactiveVar<EventModel[]> = makeVar<EventModel[]>(
  []
);
export const followingsVar: ReactiveVar<UserModel[]> = makeVar<UserModel[]>([]);
export const currentLocationVar: ReactiveVar<AddressModel | undefined> =
  makeVar<AddressModel | undefined>(undefined);

const cache = new InMemoryCache();
export default cache;
