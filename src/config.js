import Firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAuzY8ReCW5hIp0n7KUy2QmExfRHyUL8p0",
    authDomain: "navigatorcombined.firebaseapp.com",
    databaseURL: "https://navigatorcombined.firebaseio.com",
    projectId: "navigatorcombined",
    storageBucket: "navigatorcombined.appspot.com",
    messagingSenderId: "812123715329",
    appId: "1:812123715329:web:5686638a2923547ff58d00",
    measurementId: "G-LGY6R86HXN"
  };

  const app = Firebase.initializeApp(firebaseConfig);
  export const db = app.database();