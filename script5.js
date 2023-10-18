
let localStorageAccountInfo = []


const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")

const LOCAL_STORAGE_ACCOUNT_PREFIX = "ACCOUNT_INFO_RETREIVAL"
const ACCOUNT_INFO_KEY = `${LOCAL_STORAGE_ACCOUNT_PREFIX}-accountInfo`

function loadAccountInfo(){
  const storedData = localStorage.getItem(ACCOUNT_INFO_KEY)
  return JSON.parse(storedData) || []
}

const accounts = loadAccountInfo()
console.log(forums)

if (accounts != null){
  for(let i = 0; i < accounts.length; i++){
    const accountsData = {
      username: accounts[i].username,
      email: accounts[i].email,
      password: accounts[i].password
    }

  
    localStorageAccountInfo.push(accountsData)
  }
}


document.addEventListener("click", e => {
  e.preventDefault()
  if (!e.target.matches("[data-sign-up-btn]")) return 
  // Retrieve form data
  const formData = new FormData(e.target)
  const username= formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')

  // Create an object or structure to hold the data
  const accountData = {
    username: username,
    email: email,
    password: password
  }

  localStorageAccountInfo.push(accountData)

  // Store the data in localStorage
  localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(localStorageAccountInfo))

  // Optionally, you can clear the form fields after submission
  e.target.reset()

  const bool = true
  // Redirect to the separate HTML page
  window.location.href = `index.html?bool=${bool}`
})
