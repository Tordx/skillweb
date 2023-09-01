import { collection, getDocs } from '@firebase/firestore';
import { auth, db } from '../../../firebase';
import React, { useEffect, useState } from 'react'
import { userdata } from 'types/interfaces';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css'
export default function Login({}) {

  const [loginemail, setloginEmail] = useState('');
  const [loginpassword, setloginPassword] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
   const getUserData = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, 'user'));
      querySnapshot.forEach((doc) => {
      });
    } catch (error) {
      console.log(error);
      console.log('Error getting user documents: ', error);
    }
};

getUserData();
    
  }, []);

  const checkStatus = async (e: any) => {
    e.preventDefault()
    const querySnapshot = await getDocs(collection(db, "user"));
    const userData: userdata[] = [];
  
    querySnapshot.forEach((doc) => {
      if (doc.data().email === loginemail) {
        userData.push({
            email: doc.data().email, // Add email property
            displayName: doc.data().displayName, // Add displayName property
            password: doc.data().password, // Add password property
            photoURL: doc.data().photoURL, // Add photoURL property
            usertype: doc.data().usertype,
            emailVerified: doc.data().emailVerified,
        });
      }
    });
  
    if (userData.length > 0) {
      const isAdmin = userData.some((user) => user.usertype === "Admin");
      console.log(isAdmin);
      if (isAdmin) {
        const email = loginemail;
        const password = loginpassword;
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin/chat");
      } else {
        alert("The provided email does not belong to an admin user.");
      }
    } else {
      alert("no matches found with the email and password provided.");
    }
  };


  return (
    <div className='container'>
      <div>
        <input />
      </div>
    </div>
  )
}