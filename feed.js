// Simulated Logged-in User Data (Replace with real user info)
const currentUser = {
    name: "Admin User",
    profilePic: "profile.png" // Replace with user's actual profile image
};

// Handle pressing Enter to post
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addPost();
    }
}

// Function to format post time dynamically
function formatTime(timestamp) {
    if (!timestamp) return "Just now"; // Prevents NaN errors

    const now = new Date();
    const postDate = new Date(timestamp); // Convert string to Date object
    const timeDiff = Math.floor((now - postDate) / 1000); // Difference in seconds

    if (isNaN(timeDiff)) return "Just now"; // Fallback if timestamp is invalid

    if (timeDiff < 60) {
        return "Just now";
    } else if (timeDiff < 3600) {
        return `${Math.floor(timeDiff / 60)} min${Math.floor(timeDiff / 60) === 1 ? "" : "s"} ago`;
    } else if (timeDiff < 86400) {
        return `${Math.floor(timeDiff / 3600)} hr${Math.floor(timeDiff / 3600) === 1 ? "" : "s"} ago`;
    } else {
        return `${Math.floor(timeDiff / 86400)} day${Math.floor(timeDiff / 86400) === 1 ? "" : "s"} ago`;
    }
}

function savePost(postText, postTime, imageSrc) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postID = Date.now(); // Generate a unique ID for sorting

    let newPost = {
        id: postID,
        text: postText,
        time: postTime, // Ensure proper timestamp
        image: imageSrc
    };

    posts.unshift(newPost); // Add new post to the **beginning** (so it's first)
    posts.sort((a, b) => new Date(b.time) - new Date(a.time)); // Sort newest to oldest

    localStorage.setItem("posts", JSON.stringify(posts));

    createPostElement(newPost); // Display the new post immediately
}


function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.time) - new Date(a.time));

    document.getElementById("feed").innerHTML = ""; // Clear feed before loading

    posts.forEach(post => {
        createPostElement(post);
    });
}

// Load posts when the page loads
document.addEventListener("DOMContentLoaded", loadPosts);

function deletePost(postID) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Remove the post from localStorage
    posts = posts.filter(post => post.id !== postID);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Remove the post from the UI
    let postElement = document.querySelector(`.post[data-id='${postID}']`);
    if (postElement) {
        postElement.remove();
    }
}



// Function to add a new post
function addPost() {
    const postText = document.getElementById("postText").value.trim();
    const uploadImage = document.getElementById("uploadImage").files[0];

    if (!postText && !uploadImage) {
        alert("Please enter text or upload an image.");
        return;
    }

    const postTime = new Date().toISOString();
    let imageSrc = "";

    if (uploadImage) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imageSrc = event.target.result;
            savePost(postText, postTime, imageSrc); // Save post to localStorage
            clearImagePreview();
        };
        reader.readAsDataURL(uploadImage);
    } else {
        savePost(postText, postTime, imageSrc); // Save text-only post
    }

    // Clear input fields
    document.getElementById("postText").value = "";
    document.getElementById("uploadImage").value = "";
}

function clearImagePreview() {
    document.getElementById("imagePreviewContainer").style.display = "none";
    document.getElementById("imagePreview").src = "";
    document.getElementById("uploadImage").value = "";
}

// Function to create and insert a post
function createPostElement(post) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.setAttribute("data-id", post.id);

    let imgHtml = post.image ? `<img src="${post.image}" class="post-img" alt="User Post">` : "";

    newPost.innerHTML = `
        <div class="post-header">
            <img src="${currentUser.profilePic}" alt="Profile" class="profile-pic">
            <div class="user-info">
                <h4>${currentUser.name}</h4>
                <span class="post-time" data-time="${post.time}">${formatTime(new Date(post.time))}</span>
            </div>
            <button class="delete-btn" onclick="deletePost(${post.id})">🗑️</button>
        </div>
        <p>${post.text}</p>
        ${imgHtml}
        <div class="actions">
            <button class="like-btn" onclick="toggleLike(this)">❤️ <span class="like-count">0</span></button>
            <button class="comment-btn" onclick="toggleComments(this)">💬 Comment</button>
        </div>
        <div class="comment-section">
            <div class="comment-list"></div>
            <input type="text" placeholder="Write a comment..." class="comment-input" onkeypress="addComment(event)">
        </div>
    `;

    document.getElementById("feed").prepend(newPost); // Always add new posts at the top
}


// Function to update post times dynamically
function updatePostTimes() {
    document.querySelectorAll(".post-time").forEach((timeSpan) => {
        const postTime = timeSpan.getAttribute("data-time");
        if (postTime) {
            timeSpan.textContent = formatTime(postTime);
        }
    });
}

// Auto-update post times every minute
setInterval(updatePostTimes, 60000);


// Function to handle likes (only increases count)
// Function to handle likes (toggle behavior)
function toggleLike(button) {
    let post = button.closest(".post");
    let likeCount = post.querySelector(".like-count");
    let currentCount = parseInt(likeCount.textContent);

    // Ensure each post has a unique ID
    if (!post.hasAttribute("data-id")) {
        post.setAttribute("data-id", Date.now()); // Assign a unique ID if missing
    }

    let postID = post.getAttribute("data-id");
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

    if (likedPosts[postID]) {
        // Unlike the post
        likeCount.textContent = currentCount - 1;
        button.classList.remove("liked");
        delete likedPosts[postID];
    } else {
        // Like the post
        likeCount.textContent = currentCount + 1;
        button.classList.add("liked");
        likedPosts[postID] = true;
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
}



// Function to toggle comment section visibility
function toggleComments(button) {
    let commentSection = button.closest(".post").querySelector(".comment-section");
    commentSection.style.display = (commentSection.style.display === "block") ? "none" : "block";
}

// Function to add a comment when pressing Enter
function addComment(event) {
    if (event.key === "Enter") {
        let inputField = event.target;
        let commentText = inputField.value.trim();

        if (commentText !== "") {
            let commentList = inputField.closest(".post").querySelector(".comment-list"); // FIXED

            let newComment = document.createElement("div");
            newComment.classList.add("comment");

            let profilePic = document.createElement("img");
            profilePic.src = currentUser.profilePic;
            profilePic.classList.add("comment-profile");

            let commentContent = document.createElement("div");
            commentContent.classList.add("comment-content");
            commentContent.innerHTML = `<strong>${currentUser.name}</strong><br>${commentText}`;

            newComment.appendChild(profilePic);
            newComment.appendChild(commentContent);
            commentList.appendChild(newComment);

            inputField.value = ""; // Clear input field after posting
        }
    }
}


function toggleDropdown() {
    let dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("active");
}


// Function to show image preview
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreviewContainer").style.display = "flex";
        };
        reader.readAsDataURL(file);
    }
}

// Function to add post & remove image preview after posting


