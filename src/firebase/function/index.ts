 import { applicationdata, employerdata, freelancedata, jobdata, statusdata } from 'types/interfaces';
import { db } from '../../firebase'
import { collection, getDocs } from '@firebase/firestore'

 export const fetchdata = async(data: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, data));
    const thisdata: jobdata[] = []
    querySnapshot.forEach((doc) => {
      thisdata.push({
        budget: doc.data().budget,
        description: doc.data().description,
        fullname: doc.data().fullname,
        jobid: doc.data().jobid,
        joblocation: doc.data().joblocation,
        jobtitle: doc.data().jobtitle,
        pertimeframe: doc.data().pertimeframe,
        photoURL: doc.data().photoURL,
        qualification: doc.data().qualification,
        requirements: doc.data().requirements,
        scope: doc.data().scope,
        status: doc.data().status,
        timestamp: doc.data().timestamp,
        type: doc.data().type,
        userid: doc.data().userid,
      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
  }

export const fetchemployerdata = async() => {
  try {
  const querySnapshot = await getDocs(collection(db, 'user'))
  const thisdata: employerdata[] = []
  querySnapshot.forEach((doc) => {
    if(doc.data().usertype == 'employer'){
      thisdata.push({
        address: doc.data().address,
        businesshours: doc.data().businesshours,
        contactnumber: doc.data().contactnumber,
        email: doc.data().email,
        fullname: doc.data().fullname,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid,
        username: doc.data().username,
        usertype: doc.data().usertype,
        website: doc.data().website,
      })
    }
  });

  return thisdata

  } catch(error) {
    console.error(error)
  }
}

export const fetchuserdata = async() => {
  try {
  const querySnapshot = await getDocs(collection(db, 'user'))
  const thisdata: freelancedata[] = []
  querySnapshot.forEach((doc) => {
    if(doc.data().usertype == 'freelance'){
      thisdata.push({
        CSE: doc.data().CSE,
        Cert: doc.data().Cert,
        ProfLi: doc.data().ProfLi,
        SpeSkills: doc.data().SpeSkills,
        address: doc.data().address,
        contactnumber: doc.data().contactnumber,
        dob: doc.data().dob,
        email: doc.data().email,
        emergencycontactname: doc.data().emergencycontactname,
        emergencycontactnum: doc.data().emergencycontactnum,
        fullname: doc.data().fullname,
        gender: doc.data().gender,
        highesteduc: doc.data().highesteduc,
        jobTitle: doc.data().jobTitle,
        nationality: doc.data().nationality,
        photoURL: doc.data().photoURL,
        readonlyelationship: doc.data().readonlyelationship,
        uid: doc.data().uid,
        username: doc.data().username,
        usertype: doc.data().usertype,
        employment: doc.data().employment,
        employmenttype: doc.data().employmenttype,
        timestamp: doc.data().timestamp,
      })
    }
  });

  return thisdata

  } catch(error) {
    console.error(error)
  }
}

export const fetchstatus = async() => {
  try {
  const querySnapshot = await getDocs(collection(db, 'hirestatus'))
  const thisdata: statusdata[] = []
  querySnapshot.forEach((doc) => {
      thisdata.push({
        uid: doc.data().uid,
        employment: doc.data().employment,
        timestamp: doc.data().timestamp,
      })
  });

  return thisdata

  } catch(error) {
    console.error(error)
  }
}

export const fetchapplication = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'application'))
    const thisdata: applicationdata[] = []
    querySnapshot.forEach((doc) => {
        thisdata.push({
          applicationid: doc.data().applicationid,
          contactnumber: doc.data().contactnumber,
          email: doc.data().email,
          for: doc.data().for,
          forread: doc.data().forread,
          from: doc.data().from,
          fromread: doc.data().fromread,
          fullname: doc.data().fullname,
          isaccepted: doc.data().isaccepted,
          jobid: doc.data().jobid,
          jobphotoURL: doc.data().jobphotoURL,
          jobtitle: doc.data().jobtitle,
          notiftitle: doc.data().notiftitle,
          photoURL: doc.data().photoURL,
          status: doc.data().status,
          time: doc.data().time,
          timestamp: doc.data().timestamp,
          when: doc.data().when,
          where: doc.data().where,
        })
    });

    return thisdata

    } catch(error) {
      console.error(error)
    }
}