export type Children = {
  children: any | null;
}

export interface DataItem  {
  id: number;
  value: number;
  name: string;
};

export interface JobItem  {
  id: number;
  value: number;
  name: string;
  job: string;
  skills: string[];
};

export interface admindata  {
  email: string,
  displayName: string,
  password: string,
  photoURL: string,
  userType: string;
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
competencies: string[],
requirements: string[],
scope: string,
status: boolean,
timestamp: Date,
type: string,
userid: string,
}

interface address  {
  Province: string,
  City: string,
  Barangay: string,
  Street: string
}

interface fullname  {
  firstname: string,
  middlename: string,
  lastname: string,
  suffix: string,
}

export interface employerdata {
address: address[],
businesshours: string,
contactnumber: string,
email: string,
fullname: string,
photoURL: string,
uid: string,
username: string,
usertype: string,
website: string,
}

export interface freelancedata {
    username: string;
    fullname: [
      {firstname: string,},
      {middlename: string;},
      {lastname: string;},
      {suffix: string;},
    ]
    firstname: string;
    middlename: string;
    lastname: string;
    suffix: string;
    usertype: 'freelance' | 'employer';
    photoURL: string;
    email: string;
    dob: string; 
    gender: string;
    skills: string[];
    competencies: string[];
    files: string[];
    salary: string; 
    contactnumber: string;
    Province: string
    City: string;
    Barangay: string
    Street: string;
    uid: string;
    employment: boolean,
   
}

export interface statusdata {
  uid: string,
  timestamp: any,
  employment: boolean,
  
}

export interface application {
  jobtitle: string,
  jobid: string,
  value: number
}

export interface applicationdata {
  applicationid: string;
  contactnumber: string;
  email: string;
  for: string;
  forread: boolean;
  from: string;
  fromread: boolean;
  fullname: string;
  isaccepted: boolean;
  jobid: string;
  jobphotoURL: string;
  jobtitle: string;
  notiftitle: string;
  photoURL: string;
  status: string;
  time: string;
  timestamp: Date,
  when: string;
  where: string;
}