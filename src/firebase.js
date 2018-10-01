import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA1_b-qmC3l7VcpTM2W-KNUG2aIn100Q28",
  authDomain: "tester-ed12f.firebaseapp.com",
  databaseURL: "https://tester-ed12f.firebaseio.com",
  projectId: "tester-ed12f",
  storageBucket: "tester-ed12f.appspot.com",
  messagingSenderId: "390525361612"
};
firebase.initializeApp(config);
export default firebase;