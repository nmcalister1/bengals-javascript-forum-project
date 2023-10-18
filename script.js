
const nightBtn = document.querySelector("[data-night-btn]")


nightBtn.addEventListener("click", e => {
  e.preventDefault()

  document.body.classList.toggle("colorred")

  if (nightBtn.innerHTML === "Night: <b>On</b>"){
    nightBtn.innerHTML = "Night: <b>Off</b>"
  }  else {
    nightBtn.innerHTML = "Night: <b>On</b>"
  }
})

let bool = ""
const urlParams = new URLSearchParams(window.location.search)
bool = urlParams.get('bool')
if (bool == null){
  bool = ""
} else {
  // delete and replace html using javascript
}




const LOCAL_STORAGE_PREFIX1 = "COMMENTS_NUMBER_RETREIVAL"
const COMMENTS_NUMBER_KEY = `${LOCAL_STORAGE_PREFIX1}-commentsNumber`

const createThreadBtn = document.querySelector("[data-create-thread-btn]")

createThreadBtn.addEventListener("click", e => {
  e.preventDefault()

  window.location.href = "createThread.html"
})

function getTimeAgo(postDate) {
  // Get the current date and time
  const currentDate = new Date()
  
  // Get the difference in milliseconds between the current date and the post date
  const timeDiff = currentDate.getTime() - postDate
  
  
  // Convert the time difference to seconds, minutes, hours, or days
  var seconds = Math.floor(timeDiff / 1000)
  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  var days = Math.floor(hours / 24)
  
  if (days > 0) {
    return days + " day(s) ago"
  } else if (hours > 0) {
    return hours + " hour(s) ago"
  } else if (minutes > 0) {
    return minutes + " minute(s) ago"
  } else {
    return seconds + " second(s) ago"
  }
}



let count = 0
const forumWrapper = document.querySelector("[data-forum-wrapper]")

const LOCAL_STORAGE_PREFIX = "FORM_INPUT_RETREIVAL"
const FORM_INPUT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-formInput`

function loadForums(){
  const storedData = localStorage.getItem(FORM_INPUT_STORAGE_KEY)
  return JSON.parse(storedData) || []
}

const forums = loadForums()

function loadComments(){
  const storedData = localStorage.getItem(COMMENTS_NUMBER_KEY)
  return JSON.parse(storedData) || []
}

const forumComments = loadComments()
console.log(forums)


if (forums != null){
  for (let i = 0; i < forums.length; i++){
    const forumTemplateHtml = document.getElementById("forum-template")
  
    const forumTemplate = forumTemplateHtml.content.cloneNode(true)

    const forumParent = forumTemplate.querySelector("[data-forum-parent]")
    forumParent.dataset.id = forums[i].id
  
    const number = forumTemplate.querySelector("[data-number]")
    count = count + 1
    number.innerText = count
  
    const title = forumTemplate.querySelector("[data-title]")
    title.innerText = forums[i].title
  
        // Example usage
    let postDate = forums[i].createdDate  // Replace with the actual post date
    let timeAgo = getTimeAgo(postDate)
   
    const time = forumTemplate.querySelector("[data-time]")
    time.innerText = timeAgo
  
    const username = forumTemplate.querySelector("[data-username]")
    username.innerText = "username"
  
    const comments = forumTemplate.querySelector("[data-comments]")
    if (forumComments.length !== 0){
      const comment = forumComments.find(comment => comment.postId === forums[i].id)
      if (comment){
        comments.innerText = comment.commentsNumber
      } else {
        comments.innerText = 0
      }
    
      
    }
    
    
  
    forumWrapper.appendChild(forumTemplate)
  }
}




document.addEventListener("click", e => {
  e.preventDefault()

  if (!e.target.matches("[data-title]")) return 

  const parent = e.target.closest("[data-forum-parent]")
  const id = parent.dataset.id

  window.location.href = `forum.html?id=${id}`
})

document.addEventListener("click", e => {
  e.preventDefault()

  if (!e.target.matches("[data-log-in]")) return 

  window.location.href = `login.html`
})
