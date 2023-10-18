
const nightBtn = document.querySelector("[data-night-btn2]")


nightBtn.addEventListener("click", e => {
  e.preventDefault()

  document.body.classList.toggle("colorred")

  if (nightBtn.innerHTML === "Night: <b>On</b>"){
    nightBtn.innerHTML = "Night: <b>Off</b>"
  }  else {
    nightBtn.innerHTML = "Night: <b>On</b>"
  }
})

let localStorageForumInfo = []

const forumSubmitBtn = document.querySelector("[data-forum]")
const title = document.getElementById("title")
const message = document.getElementById("message")

const LOCAL_STORAGE_PREFIX = "FORM_INPUT_RETREIVAL"
const FORM_INPUT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-formInput`

function loadForums(){
  const storedData = localStorage.getItem(FORM_INPUT_STORAGE_KEY)
  return JSON.parse(storedData) || []
}

const forums = loadForums()
console.log(forums)

if (forums != null){
  for(let i = 0; i < forums.length; i++){
    const userData = {
      title: forums[i].title,
      message: forums[i].message,
      id: forums[i].id,
      createdDate: forums[i].createdDate
    }

  
    localStorageForumInfo.push(userData)
  }
}


forumSubmitBtn.addEventListener("submit", e => {
  e.preventDefault()

  // Retrieve form data
  const formData = new FormData(e.target)
  const title = formData.get('title')
  const message = formData.get('message')

  let createdDate = new Date().getTime()

  // Create an object or structure to hold the data
  const userData = {
    title: title,
    message: message,
    id: new Date().valueOf().toString(),
    createdDate: createdDate
  }

  localStorageForumInfo.push(userData)

  // Store the data in localStorage
  localStorage.setItem(FORM_INPUT_STORAGE_KEY, JSON.stringify(localStorageForumInfo))

  // Optionally, you can clear the form fields after submission
  e.target.reset()

  // Redirect to the separate HTML page
  window.location.href = 'index.html'
})









