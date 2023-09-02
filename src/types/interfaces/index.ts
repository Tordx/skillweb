export type Children = {
  children: any | null;
}

export interface userdata  {
  email: string,
  displayName: string,
  password: string,
  photoURL: string,
  usertype: string;
  emailVerified: string;
}

export interface jobdata {
budget: string,
description: string
fullname: string,
jobid: string,
joblocation: string,
jobtitle: string,
pertimeframe: string,
photoURL: string,
qualification: string,
requirements: string[],
scope: string,
status: boolean,
timestamp: Date,
type: string,
userid: string,
}