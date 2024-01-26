const firebaseConfig = {
  apiKey: "AIzaSyBooRw8q86fnSegmIk9PC9ynkbp6ODyQoE",
  authDomain: "opijk-f14cd.firebaseapp.com",
  databaseURL: "https://opijk-f14cd-default-rtdb.firebaseio.com",
  projectId: "opijk-f14cd",
  storageBucket: "opijk-f14cd.appspot.com",
  messagingSenderId: "970116476040",
  appId: "1:970116476040:web:c9c81ac9b47b988028433d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the databas
// Get a reference to the Firebase Realtime Database
const database = firebase.database();

function updateMaxValue() {
  const maxSelect = document.getElementById('max');
  const selectedMax = maxSelect.value;

  firebase.database().ref('settings/max').set(selectedMax);
  console.log(selectedMax)

}
// Function to add a word to the database
function addUser() {
  const log = document.getElementById('login');
  const pwd = document.getElementById('pwd');
  const ml = document.getElementById('mail');
  
  const teach = document.getElementById('tch');
  const login = log.value.trim();
  const pas = pwd.value.trim();
  
  const tch = teach.value.trim();
  const mail = ml.value.trim();


  // Check if the user already exists
  const userRef = database.ref('users').child(login);
  userRef.once('value')
      .then(snapshot => {
          if (snapshot.exists()) {
              // User already exists, show confirm dialog
              const confirmUpdate = confirm(`User '${login}' already exists in the database. Do you want to update the data?`);
              
              if (confirmUpdate) {
                  // Update data in Firebase
                  userRef.update({
                    login: login,
                      pwd: pas,
                      mail: mail,
                      teacher: tch,
                  });

                  console.log('User data updated successfully.');
              }
          } else {
              // User does not exist, proceed to add
              userRef.set({
                  login: login,
                  pwd: pas,
                  mail: mail,
                  teacher: tch,

              });

              console.log('User added successfully.');
          }

          // Clear input fields after adding/updating user
          log.value = '';
          pwd.value = '';
        
          teach.value = '';
          ml.value = ''
      })
      .catch(error => {
          console.error('Error checking user existence:', error);
      });
}

// Get a reference to the root of your data structure
const dataRef = database.ref('/');

function updateMaxValue() {
  // Implement your logic to update the maximum prize places in Firebase
  var maxSelect = document.getElementById("max");
  var selectedMax = maxSelect.value;  // Use .value directly to get the selected value

  console.log("Selected Max Value:", selectedMax);  // Log to check if the value is captured correctly

  // Example: update value in Firebase
  firebase.database().ref('settings/max').set(selectedMax)
      .then(() => {
          console.log('Max value updated successfully.');
      })
      .catch(error => {
          console.error('Error updating max value:', error);
      });
}
document.querySelectorAll('.btn-check').forEach(function (element) {
  element.addEventListener('change', function () {
      document.querySelectorAll('.collapse').forEach(function (collapse) {
          collapse.classList.remove('show');
      });
      var targetId = this.getAttribute('data-bs-target').substring(1);
      document.getElementById(targetId).classList.add('show');
  });
});
