// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Swal from 'sweetalert2';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARz702iLkdhYfXTf_fzCYScubaeZZmIWs",
  authDomain: "homebankingapp-4b70f.firebaseapp.com",
  projectId: "homebankingapp-4b70f",
  storageBucket: "homebankingapp-4b70f.appspot.com",
  messagingSenderId: "57965002601",
  appId: "1:57965002601:web:07848bab14e4fae24a07f8"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const storage = getStorage(appFirebase)


export async function uploadFile(file, src){
 const storageRef=ref(storage, "avatar/"+src)
 await uploadBytes(storageRef, file)
const url = await getDownloadURL(storageRef)
return url

}

