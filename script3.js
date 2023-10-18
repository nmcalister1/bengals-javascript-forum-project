const nightBtn = document.querySelector("[data-night-btn3]")


nightBtn.addEventListener("click", e => {
  e.preventDefault()

  document.body.classList.toggle("colorred")

  if (nightBtn.innerHTML === "Night: <b>On</b>"){
    nightBtn.innerHTML = "Night: <b>Off</b>"
  }  else {
    nightBtn.innerHTML = "Night: <b>On</b>"
  }
})





let commentReplyArray = []
let localStorageForumReplyInfo = []

const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get('id')

const LOCAL_STORAGE_PREFIX = "FORM_INPUT_RETREIVAL"
const FORM_INPUT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-formInput`


function loadForums(){
  const storedData = localStorage.getItem(FORM_INPUT_STORAGE_KEY)
  return JSON.parse(storedData) || []
}

const forums = loadForums()

function findForum(){
  if (forums != null){
    for (let i = 0; i < forums.length; i++){
      const specifiedForum = forums.find(f => f.id === postId)
      
      return specifiedForum
    }
  }
}

const {title, message, createdDate} = findForum()

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


const forumWrapper = document.querySelector("[data-main-forum-wrapper]")


function renderForum(title, message, createdDate){
  const renderForumTemplate = document.getElementById("render-forum-template")

  const forumTemplate = renderForumTemplate.content.cloneNode(true)

  const forumTitle = forumTemplate.querySelector("[data-title]")
  forumTitle.innerText = title

  const username = forumTemplate.querySelector("[data-username]")
  username.innerText = "username"

  const time = forumTemplate.querySelector("[data-time]")
  let timeAgo = getTimeAgo(createdDate)
  time.innerText = "posted " + timeAgo

  const text = forumTemplate.querySelector("[data-main-text]")
  text.innerText = message

  forumWrapper.appendChild(forumTemplate)
}

renderForum(title, message, createdDate)













const LOCAL_STORAGE_PREFIX1 = "COMMENTS_NUMBER_RETREIVAL"
const COMMENTS_NUMBER_KEY = `${LOCAL_STORAGE_PREFIX1}-commentsNumber`



const LOCAL_STORAGE_PREFIX2 = "FORM_REPLY_RETREIVAL"
const FORM_INPUT_STORAGE_KEY2 = `${LOCAL_STORAGE_PREFIX2}-formReply`

const LOCAL_STORAGE_PREFIX3 = "REPLY_REPLY_RETREIVAL"
const FORM_INPUT_STORAGE_KEY3 = `${LOCAL_STORAGE_PREFIX3}-replyReply`

let localStorageCommentsArray = []


const forumReply = document.querySelector("[data-send-btn2]")
const formField = document.querySelector("[data-forum2]")

const forumReplyWrapper = document.querySelector("[data-reply-list-wrapper]")






let count = 0
forumReply.addEventListener("click", e => {
  e.preventDefault()

  const renderForumReplyTemplate = document.getElementById("render-forum-reply-template")

  const forumReplyTemplate = renderForumReplyTemplate.content.cloneNode(true)

  const replyText = forumReplyTemplate.querySelector("[data-reply-text]")
  const replyMessage = document.getElementById("message").value
  replyText.innerText = replyMessage

  const replyNumber = forumReplyTemplate.querySelector("[data-reply-number]")
  count = count + 1
  replyNumber.innerText = "#" + count

  const replyUsername = forumReplyTemplate.querySelector("[data-reply-username]")
  replyUsername.innerText = "username"

  const replyLikesNumber = forumReplyTemplate.querySelector("[data-reply-likes-number]")
  replyLikesNumber.innerText = 0

  const replyLikes = forumReplyTemplate.querySelector("[data-reply-likes]")
  replyLikes.innerText = "Likes"

  const replyLikeBtn = forumReplyTemplate.querySelector("[data-reply-like-btn]")
  replyLikeBtn.innerText = "+"

  const replyDislikeBtn = forumReplyTemplate.querySelector("[data-reply-dislike-btn]")
  replyDislikeBtn.innerText = "-"

  const replyTime = forumReplyTemplate.querySelector("[data-reply-time]")
  let createdDate = new Date().getTime()
  let timeAgo = getTimeAgo(createdDate)
  replyTime.innerText = "posted " + timeAgo

  const replyBtn = forumReplyTemplate.querySelector("[data-reply-reply-btn3]")
  replyBtn.innerText = "reply"

  const id = new Date().valueOf().toString()
  const parent = forumReplyTemplate.querySelector(".reply-parent")
  parent.dataset.id = id

  forumReplyWrapper.append(forumReplyTemplate)

  const userReply = {
    replyMessage: replyMessage,
    likes: 0,
    postId: postId,
    id: id,
    reply: false,
    replyCreatedDate: createdDate
  }

  localStorageForumReplyInfo.push(userReply)

  // Store the data in localStorage
  localStorage.setItem(FORM_INPUT_STORAGE_KEY2, JSON.stringify(localStorageForumReplyInfo))
  // Optionally, you can clear the form fields after submission

  
 
  if (localStorageCommentsArray.length !== 0) {
    // Increment the comment count for the post
    
    
    const comment = localStorageCommentsArray.find(comment => comment.postId === postId)
   
    if (comment){
      comment.commentsNumber++
      
    } else {
      const postComments = {
        postId: postId,
        commentsNumber: 1
      }
      localStorageCommentsArray.push(postComments)
    }
      
  } else {
    
      const postComments = {
        postId: postId,
        commentsNumber: 1
      }
      localStorageCommentsArray.push(postComments)
      
  }
    // If the post doesn't exist, initialize the comment count as 1
  localStorage.setItem(COMMENTS_NUMBER_KEY, JSON.stringify(localStorageCommentsArray))

  
  
  console.log(localStorage.getItem(COMMENTS_NUMBER_KEY))

  formField.reset()
})

function loadForumComments(){
  const storedReplyData = localStorage.getItem(COMMENTS_NUMBER_KEY)
  return JSON.parse(storedReplyData) || []
}

const forumComments = loadForumComments()

if (forumComments != null){
  for(let i = 0; i < forumComments.length; i++){
    const postComments = {
      postId: forumComments[i].postId,
      commentsNumber: forumComments[i].commentsNumber
    }
  
    localStorageCommentsArray.push(postComments)
  }
}

function loadForumsReply(){
  const storedReplyData = localStorage.getItem(FORM_INPUT_STORAGE_KEY2)
  return JSON.parse(storedReplyData) || []
}

const forumsReply = loadForumsReply()

if (forumsReply != null){
  for(let i = 0; i < forumsReply.length; i++){
    const userData = {
      replyMessage: forumsReply[i].replyMessage,
      likes: forumsReply[i].likes, 
      postId: forumsReply[i].postId,
      id: forumsReply[i].id,
      reply: forumsReply[i].reply,
      replyCreatedDate: forumsReply[i].replyCreatedDate,
      
    }
  
    localStorageForumReplyInfo.push(userData)
  }
}


function loadCommentReply(){
  const storedReplyData = localStorage.getItem(FORM_INPUT_STORAGE_KEY3)
  return JSON.parse(storedReplyData) || []
}

const commentReply = loadCommentReply()

if (commentReply != null){
  for(let i = 0; i < commentReply.length; i++){
    const commentReplyData = {
      likes: commentReply[i].likes, 
      text: commentReply[i].text,
      id: commentReply[i].id,
      replyId: commentReply[i].replyId
    }
  
    commentReplyArray.push(commentReplyData)
  }
}

if (forumsReply != null) {
  for (let i = 0; i < forumsReply.length; i++){
    if (forumsReply[i].postId === postId){
      const renderForumReplyTemplate = document.getElementById("render-forum-reply-template")
  
      const forumReplyTemplate = renderForumReplyTemplate.content.cloneNode(true)

      const replyParent = forumReplyTemplate.querySelector(".reply-parent")
      replyParent.dataset.id = forumsReply[i].id
    
      const replyNumber = forumReplyTemplate.querySelector("[data-reply-number]")
      count = count + 1
      replyNumber.innerText = "#" + count
    
      const replyUsername = forumReplyTemplate.querySelector("[data-reply-username]")
      replyUsername.innerText = "username"
    
      const replyLikesNumber = forumReplyTemplate.querySelector("[data-reply-likes-number]")
      replyLikesNumber.innerText = forumsReply[i].likes
    
      const replyLikes = forumReplyTemplate.querySelector("[data-reply-likes]")
      replyLikes.innerText = "Likes"
    
      const replyLikeBtn = forumReplyTemplate.querySelector("[data-reply-like-btn]")
      replyLikeBtn.innerText = "+"
    
      const replyDislikeBtn = forumReplyTemplate.querySelector("[data-reply-dislike-btn]")
      replyDislikeBtn.innerText = "-"
    
      const replyText = forumReplyTemplate.querySelector("[data-reply-text]")
      replyText.innerText = forumsReply[i].replyMessage
    
      const replyTime = forumReplyTemplate.querySelector("[data-reply-time]")
      let timeAgo = getTimeAgo(forumsReply[i].replyCreatedDate)
      replyTime.innerText = "posted " + timeAgo
    
      const replyBtn = forumReplyTemplate.querySelector("[data-reply-reply-btn3]")
      replyBtn.innerText = "reply"

      const replyWrapper = forumReplyTemplate.querySelector(".reply-div-wrapper")

      if (commentReply != null){
        if (forumsReply[i].reply === true){ //&& commentReply[i].id === forumsReply[i].id
          const comments = commentReply.filter(reply => reply.id === forumsReply[i].id)
    
          for (let j = 0; j < comments.length; j++){
            const responseElement = document.createElement('div')
            const text = comments[j].text
            const replyId = comments[j].replyId
            const likes = comments[j].likes
            responseElement.innerHTML = `<div class='reply-reply-list-wrapper' data-reply-id='${replyId}'><div><ul class='reply-reply'><div class='first-reply-list'><li class='reply-username'><a href='#' class='reply-username-repy-link' data-reply-number>@username</a></li><li class='reply-username'><a href='#' class='reply-username-link' data-reply-username>username</a></li></div><div class='second-reply-list'><li class='reply-likes-number' data-reply-reply-likes-number>${likes}</li><li class='reply-likes' data-reply-likes>Likes</li><li><button class='like-btn btn' data-reply-reply-like-btn>+</button></li><li><button class='dislike-btn btn' data-reply-reply-dislike-btn>-</button></li></div></ul><div class='reply-reply-wrapper'><div class='reply' data-reply-text>${text}</div><div class='reply-flex'><div class='reply-time' data-reply-time></div><button class='reply-btn btn' data-reply-reply-btn>reply</button></div></div></div><div data-reply-reply-template-wrapper></div><div data-reply-reply-wrapper></div></div>`
            
            replyWrapper.append(responseElement)
            
          }
        }
      }

      forumReplyWrapper.appendChild(forumReplyTemplate)
      
    }
  }
}












document.addEventListener("click", e => {
  e.preventDefault()

  if (!e.target.matches("[data-reply-like-btn]")) return 
  const parent = e.target.closest(".reply-parent")
  const number = parent.querySelector("[data-reply-likes-number]")

  let likesNumber = parseInt(number.innerText)
  let newLikesNumber = likesNumber + 1
  number.innerText = newLikesNumber


  for (let i = 0; i < forumsReply.length; i++){
    if (forumsReply[i].id === parent.dataset.id){
    
      localStorageForumReplyInfo[i].likes = newLikesNumber
    }
  }

  localStorage.setItem(FORM_INPUT_STORAGE_KEY2, JSON.stringify(localStorageForumReplyInfo))

})

console.log(localStorageForumReplyInfo)


document.addEventListener("click", e => {
  e.preventDefault()

  if (!e.target.matches("[data-reply-dislike-btn]")) return 
  const parent = e.target.closest(".reply-parent")
  const number = parent.querySelector("[data-reply-likes-number]")
  
  let likesNumber = parseInt(number.innerText)
  let newLikesNumber = likesNumber - 1
  number.innerText = newLikesNumber


  for (let i = 0; i < forumsReply.length; i++){
    if (forumsReply[i].id === parent.dataset.id){
    
      localStorageForumReplyInfo[i].likes = newLikesNumber
    }
  }

  localStorage.setItem(FORM_INPUT_STORAGE_KEY2, JSON.stringify(localStorageForumReplyInfo))
  
})

document.addEventListener("click", e => {
  e.preventDefault()

  if (!e.target.matches("[data-bengals-img]")) return 

  window.location.href = "index.html"
})















document.addEventListener("click", e => {
  e.preventDefault()
  if (!e.target.matches("[data-reply-reply-btn3]")) return 
  // Step 3: Create a text box dynamically

  const replyFormHTML = "<form class='form' data-reply-form><textarea name='reply-message' id='reply-message'></textarea><div class='btn-container'><button class='btn btn-square' type='submit' data-reply-reply-submit-btn>Submit Reply</button></div></form>"
  const parent = e.target.closest(".comment-reply-wrapper")
  const parent1 = e.target.closest(".reply-parent")
  const formDiv = parent.querySelector(".comment-reply-div")
  formDiv.innerHTML = replyFormHTML
  //console.log(parent.querySelector("#reply-message").value)

  const replyReply = parent.querySelector("[data-reply-reply-submit-btn]")

  replyReply.addEventListener("click", e => {
    e.preventDefault()

    const replyId = new Date().valueOf().toString()
    // Create the response element
    const responseElement = document.createElement('div')
    const text = parent.querySelector("#reply-message").value
    responseElement.innerHTML = `<div class='reply-reply-list-wrapper' data-reply-id='${replyId}'><div><ul class='reply-reply'><div class='first-reply-list'><li class='reply-username'><a href='#' class='reply-username-repy-link' data-reply-number>@username</a></li><li class='reply-username'><a href='#' class='reply-username-link' data-reply-username>username</a></li></div><div class='second-reply-list'><li class='reply-likes-number' data-reply-reply-likes-number>0</li><li class='reply-likes' data-reply-likes>Likes</li><li><button class='like-btn btn' data-reply-reply-like-btn>+</button></li><li><button class='dislike-btn btn' data-reply-reply-dislike-btn>-</button></li></div></ul><div class='reply-reply-wrapper'><div class='reply' data-reply-text>${text}</div><div class='reply-flex'><div class='reply-time' data-reply-time></div><button class='reply-btn btn' data-reply-reply-btn>reply</button></div></div></div><div data-reply-reply-template-wrapper></div><div data-reply-reply-wrapper></div></div>`
    parent1.querySelector(".reply-div-wrapper").append(responseElement)
    //parent.querySelector("[data-reply-div-wrapper]").dataset.replyId = replyId
    const id = parent1.dataset.id

    const commentReplyData = {
      likes: 0, 
      text: text,
      id: id,
      replyId: replyId
    }

    commentReplyArray.push(commentReplyData)
    localStorage.setItem(FORM_INPUT_STORAGE_KEY3, JSON.stringify(commentReplyArray))

    for (let i = 0; i < localStorageForumReplyInfo.length; i++){
      if (localStorageForumReplyInfo[i].id === id){
        
        localStorageForumReplyInfo[i].reply = true

      }
    }
    
    
    localStorage.setItem(FORM_INPUT_STORAGE_KEY2, JSON.stringify(localStorageForumReplyInfo))
    
    
    formDiv.innerHTML = ""
  })

  
})



document.addEventListener("click", e => {
  e.preventDefault()
  if (!e.target.matches("[data-reply-reply-btn]")) return 
  // Step 3: Create a text box dynamically

  const replyFormHTML = "<form class='form' data-reply-form><textarea name='reply-message' id='reply-message'></textarea><div class='btn-container'><button class='btn btn-square' type='submit' data-reply-reply-submit-btn>Submit Reply</button></div></form>"
  const parent = e.target.closest(".reply-reply-list-wrapper")
  const parent1 = e.target.closest(".reply-parent")
  const formDiv = parent.querySelector("[data-reply-reply-wrapper]")
  formDiv.innerHTML = replyFormHTML
  //console.log(parent.querySelector("#reply-message").value)

  const replyReply = parent.querySelector("[data-reply-reply-submit-btn]")

  replyReply.addEventListener("click", e => {
    e.preventDefault()

    const replyId = new Date().valueOf().toString()
    // Create the response element
    const responseElement = document.createElement('div')
    const text = parent.querySelector("#reply-message").value
    responseElement.innerHTML = `<div class='reply-reply-list-wrapper' data-reply-id='${replyId}'><div><ul class='reply-reply'><div class='first-reply-list'><li class='reply-username'><a href='#' class='reply-username-repy-link' data-reply-number>@username</a></li><li class='reply-username'><a href='#' class='reply-username-link' data-reply-username>username</a></li></div><div class='second-reply-list'><li class='reply-likes-number' data-reply-reply-likes-number>0</li><li class='reply-likes' data-reply-likes>Likes</li><li><button class='like-btn btn' data-reply-reply-like-btn>+</button></li><li><button class='dislike-btn btn' data-reply-reply-dislike-btn>-</button></li></div></ul><div class='reply-reply-wrapper'><div class='reply' data-reply-text>${text}</div><div class='reply-flex'><div class='reply-time' data-reply-time></div><button class='reply-btn btn' data-reply-reply-btn>reply</button></div></div></div><div data-reply-reply-template-wrapper></div><div data-reply-reply-wrapper></div></div>`
    parent1.querySelector(".reply-div-wrapper").append(responseElement)
    //parent.querySelector("[data-reply-div-wrapper]").dataset.replyId = replyId
    const id = parent1.dataset.id

    const commentReplyData = {
      likes: 0, 
      text: text,
      id: id,
      replyId: replyId
    }

    commentReplyArray.push(commentReplyData)
    localStorage.setItem(FORM_INPUT_STORAGE_KEY3, JSON.stringify(commentReplyArray))

    for (let i = 0; i < localStorageForumReplyInfo.length; i++){
      if (localStorageForumReplyInfo[i].id === id){
        
        localStorageForumReplyInfo[i].reply = true

      }
    }
    
    
    localStorage.setItem(FORM_INPUT_STORAGE_KEY2, JSON.stringify(localStorageForumReplyInfo))
    
    
    formDiv.innerHTML = ""
  })

  
})


document.addEventListener("click", e => {
  e.preventDefault()
  if (!e.target.matches("[data-reply-reply-like-btn]")) return 
  const parent = e.target.closest(".reply-reply-list-wrapper")
  const number = parent.querySelector("[data-reply-reply-likes-number]")
  const replyId = parent.dataset.replyId

  
  let likesNumber = parseInt(number.innerText)
  let newLikesNumber = likesNumber + 1
  number.innerText = newLikesNumber

  
  
  const comment = commentReplyArray.find(reply => reply.replyId === replyId)
    
  comment.likes = newLikesNumber
   

  localStorage.setItem(FORM_INPUT_STORAGE_KEY3, JSON.stringify(commentReplyArray))

})
document.addEventListener("click", e => {
  e.preventDefault()
  if (!e.target.matches("[data-reply-reply-dislike-btn]")) return 
  const parent = e.target.closest(".reply-reply-list-wrapper")
  const number = parent.querySelector("[data-reply-reply-likes-number]")
  const replyId = parent.dataset.replyId

  
  let likesNumber = parseInt(number.innerText)
  let newLikesNumber = likesNumber - 1
  number.innerText = newLikesNumber

  
  
  const comment = commentReplyArray.find(reply => reply.replyId === replyId)
    
  comment.likes = newLikesNumber
   

  localStorage.setItem(FORM_INPUT_STORAGE_KEY3, JSON.stringify(commentReplyArray))

})







