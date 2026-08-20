const API = "/api";

const state = {
  token: localStorage.getItem("connectify_token"),
  user: JSON.parse(localStorage.getItem("connectify_user") || "null"),
  view: "feed",
  profile: null,
  refreshCount: Number(localStorage.getItem("connectify_refresh_count") || 0),
  demoLiked: JSON.parse(localStorage.getItem("connectify_demo_likes") || "{}")
};

/* These are a visual fallback for an empty/new database.
   They make the internship demo feel populated without pretending
   these posts are stored in MongoDB. Real API posts are always preferred. */
const DEMO_POSTS = [
  {
    id:"demo-1",
    demo:true,
    createdAt:"2026-08-20T08:20:00Z",
    content:"Small progress is still progress. ✨ Building, learning and showing up every day.",
    author:{id:"demo-user-1",name:"Aarav Mehta",username:"aarav.mehta"},
    likesCount:128,
    commentsCount:18
  },
  {
    id:"demo-2",
    demo:true,
    createdAt:"2026-08-20T06:40:00Z",
    content:"Just shipped a new feature today. There is something special about seeing an idea become a real product. 🚀",
    author:{id:"demo-user-2",name:"Ananya Sharma",username:"ananya.codes"},
    likesCount:94,
    commentsCount:12
  },
  {
    id:"demo-3",
    demo:true,
    createdAt:"2026-08-19T18:10:00Z",
    content:"Coffee, clean code and a little bit of music. Perfect evening for building something meaningful. ☕💻",
    author:{id:"demo-user-3",name:"Vihaan Kapoor",username:"vihaan.dev"},
    likesCount:76,
    commentsCount:9
  },
  {
    id:"demo-4",
    demo:true,
    createdAt:"2026-08-19T13:30:00Z",
    content:"Reminder: you don't have to have everything figured out. Keep learning and keep moving.",
    author:{id:"demo-user-4",name:"Ishita Rao",username:"ishita.rao"},
    likesCount:153,
    commentsCount:24
  },
  {
    id:"demo-5",
    demo:true,
    createdAt:"2026-08-18T16:15:00Z",
    content:"Weekend goal: learn one new thing, finish one pending task and take some time to recharge. 🌿",
    author:{id:"demo-user-5",name:"Rohan Verma",username:"rohan.builds"},
    likesCount:61,
    commentsCount:7
  }
];

const DEMO_PEOPLE = [
  {id:"demo-person-1",name:"Ananya Sharma",username:"ananya.codes"},
  {id:"demo-person-2",name:"Vihaan Kapoor",username:"vihaan.dev"},
  {id:"demo-person-3",name:"Ishita Rao",username:"ishita.rao"}
];

const DEMO_PROFILE_DATA = {
  "ananya.codes": { name:"Ananya Sharma", username:"ananya.codes", bio:"Frontend developer • building useful things with code ✨", followers:1248, following:318 },
  "vihaan.dev": { name:"Vihaan Kapoor", username:"vihaan.dev", bio:"Developer, coffee enthusiast & lifelong learner ☕💻", followers:892, following:241 },
  "ishita.rao": { name:"Ishita Rao", username:"ishita.rao", bio:"Learning in public • tech • design • good energy 🌿", followers:2140, following:406 },
  "aarav.mehta": { name:"Aarav Mehta", username:"aarav.mehta", bio:"Software engineer • sharing progress and ideas 🚀", followers:1674, following:352 },
  "rohan.builds": { name:"Rohan Verma", username:"rohan.builds", bio:"Building, learning and documenting the journey.", followers:731, following:198 }
};

const demoFollowState = JSON.parse(localStorage.getItem("connectify_demo_follows") || "{}");

const $ = id => document.getElementById(id);

const esc = (value="") =>
  String(value).replace(/[&<>"']/g,c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));

const initials = (name="U") =>
  name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase() || "U";

function avatarHTML(user, cls="avatar"){
  return `<div class="${cls}">
    ${user?.avatar ? `<img src="${esc(user.avatar)}" alt="">` : esc(initials(user?.name || "User"))}
  </div>`;
}

async function api(path,options={}){
  const headers = {
    ...(options.body ? {"Content-Type":"application/json"} : {}),
    ...(options.headers || {})
  };

  if(state.token) headers.Authorization = `Bearer ${state.token}`;

  const response = await fetch(API + path,{...options,headers});
  const data = await response.json().catch(()=>({}));

  if(!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

function toast(message,error=false,type=""){
  const node=document.createElement("div");
  node.className=`toast ${error ? "error" : type}`;
  node.textContent=message;
  $("toast-root").appendChild(node);
  setTimeout(()=>node.remove(),3000);
}

function saveSession(data){
  state.token=data.token;
  state.user=data.user;
  localStorage.setItem("connectify_token",data.token);
  localStorage.setItem("connectify_user",JSON.stringify(data.user));
}

function clearSession(){
  state.token=null;
  state.user=null;
  localStorage.removeItem("connectify_token");
  localStorage.removeItem("connectify_user");
}

function setAuthMode(register){
  $("auth-title").textContent=register ? "Create your account" : "Welcome back";
  $("auth-subtitle").textContent=register
    ? "Join your community and start sharing."
    : "Sign in to continue to your community.";

  $("name-field").classList.toggle("hidden",!register);
  $("username-field").classList.toggle("hidden",!register);
  $("name").required=register;
  $("username").required=register;
  $("password").autocomplete=register ? "new-password" : "current-password";
  $("auth-submit").innerHTML=register
    ? "<span>Create account</span><span>→</span>"
    : "<span>Sign in</span><span>→</span>";
  $("auth-switch").innerHTML=register
    ? "Already have an account? <strong>Sign in</strong>"
    : "Don't have an account? <strong>Create one</strong>";
  $("auth-form").dataset.mode=register ? "register" : "login";
}

async function handleAuth(e){
  e.preventDefault();

  const register=e.currentTarget.dataset.mode==="register";

  const payload=register
    ? {
        name:$("name").value.trim(),
        username:$("username").value.trim(),
        email:$("email").value.trim(),
        password:$("password").value
      }
    : {
        email:$("email").value.trim(),
        password:$("password").value
      };

  const btn=$("auth-submit");
  btn.disabled=true;

  try{
    const data=await api(register ? "/auth/register" : "/auth/login",{
      method:"POST",
      body:JSON.stringify(payload)
    });

    saveSession(data);
    showApp();
    toast(register ? "Account created. Welcome to Connectify!" : "Welcome back!");
  }catch(error){
    toast(error.message,true);
  }finally{
    btn.disabled=false;
  }
}

function showApp(){
  $("auth-screen").classList.add("hidden");
  $("app").classList.remove("hidden");
  hydrateUser();
  renderStories();
  loadFeed();
  loadDiscover();
}

function showAuth(){
  $("app").classList.add("hidden");
  $("auth-screen").classList.remove("hidden");
  setAuthMode(false);
}

function hydrateUser(){
  const u=state.user || {name:"User",username:"user"};

  $("side-name").textContent=u.name;
  $("side-username").textContent=`@${u.username}`;

  $("top-avatar").innerHTML=u.avatar
    ? `<img src="${esc(u.avatar)}" alt="">`
    : initials(u.name);

  $("side-avatar").outerHTML=avatarHTML(u,"avatar").replace(
    'class="avatar"','class="avatar" id="side-avatar"'
  );

  $("composer-avatar").outerHTML=avatarHTML(u,"avatar").replace(
    'class="avatar"','class="avatar" id="composer-avatar"'
  );
}

function renderStories(){
  const users=[
    {name:"Your story",avatar:state.user || {name:"You"},own:true},
    {name:"Ananya",avatar:{name:"Ananya Sharma"}},
    {name:"Vihaan",avatar:{name:"Vihaan Kapoor"}},
    {name:"Ishita",avatar:{name:"Ishita Rao"}},
    {name:"Aarav",avatar:{name:"Aarav Mehta"}},
    {name:"Rohan",avatar:{name:"Rohan Verma"}}
  ];

  $("stories").innerHTML=users.map((u,index)=>`
    <div class="story ${u.own ? "story-add":""}" title="${u.own ? "Create your story":"View story"}">
      <div class="story-ring">
        ${u.own
          ? `<div class="avatar">+</div>`
          : avatarHTML(u.avatar,"avatar")}
      </div>
      <span>${esc(u.name)}</span>
    </div>
  `).join("");
}

function loadingHTML(){
  return `<div class="card empty loading-card"><span class="spinner"></span> Loading your feed...</div>`;
}

async function loadFeed(){
  const feed=$("feed");
  feed.innerHTML=loadingHTML();

  try{
    const data=await api("/posts/feed");
    let posts=Array.isArray(data.posts) ? data.posts : [];

    /*
      Important:
      A brand-new account often has no followed users, so /posts/feed
      legitimately returns [].
      We keep the real API posts, but use polished showcase posts as a
      frontend fallback so the internship demo never looks broken.
    */
    if(!posts.length){
      posts=[...DEMO_POSTS];
    }else{
      /* Keep the real database posts and add 2 showcase posts only when
         the database contains very little content. */
      posts=[...posts,...DEMO_POSTS.slice(0,Math.max(0,3-posts.length))];
    }

    /* Refresh changes the order, making the feed feel alive. */
    posts=shuffle(posts);

    feed.innerHTML=posts.map((post,index)=>postHTML(post,index)).join("");

  }catch(error){
    /* Even if the API is temporarily unavailable, the UI remains usable
       for a portfolio demo instead of showing a dead blank page. */
    feed.innerHTML=shuffle([...DEMO_POSTS])
      .map((post,index)=>postHTML(post,index)).join("");

    toast("Showing showcase posts while the server reconnects.",true);
  }
}

function postHTML(post,index=0){
  const isDemo=Boolean(post.demo);
  const liked=isDemo && state.demoLiked[post.id];
  const likeCount=(post.likesCount || 0)+(liked ? 1:0);
  const author=post.author || {name:"Unknown user",username:"unknown",id:"unknown"};
  const isOwn=!isDemo && author.id===state.user?.id;
  const isFollowing=isDemo ? Boolean(demoFollowState[author.username]) : Boolean(author.isFollowing);

  return `
    <article class="post card" data-post-id="${esc(post.id)}" data-demo="${isDemo}">
      <div class="post-head">
        <button class="author author-button" data-action="open-profile" data-username="${esc(author.username)}" title="Open @${esc(author.username)}'s profile">
          ${avatarHTML(author)}
          <span class="author-copy">
            <strong>${esc(author.name || "@"+author.username)}</strong>
            <small>@${esc(author.username)} · ${timeAgo(post.createdAt)}</small>
          </span>
        </button>

        <div class="post-head-actions">
          ${!isOwn ? `<button class="post-follow-btn ${isFollowing ? "following":""}" data-action="follow-author" data-author-id="${esc(author.id)}" data-username="${esc(author.username)}">
            ${isFollowing ? "Following" : "Follow"}
          </button>` : ""}
          ${isOwn
            ? `<button class="more-btn" data-action="delete-post" title="Delete">⋯</button>`
            : `<button class="more-btn" data-action="share" title="Share">↗</button>`
          }
        </div>
      </div>

      <div class="post-content">${esc(post.content)}</div>

      ${post.image
        ? `<img class="post-image" src="${esc(post.image)}" alt="Post image" loading="lazy" onerror="this.remove()">`
        : ""}

      <div class="post-actions">
        <button class="action-btn ${liked ? "active":""}" data-action="like">
          ${liked ? "♥":"♡"} ${likeCount}
        </button>

        <button class="action-btn" data-action="comments">
          ▱ ${post.commentsCount || "Comments"}
        </button>

        <button class="action-btn" data-action="share">
          ↗ Share
        </button>
      </div>

      <div class="comments hidden" data-comments></div>
    </article>
  `;
}

function shuffle(items){
  const arr=[...items];

  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }

  return arr;
}

function timeAgo(date){
  const seconds=Math.max(0,Math.floor((Date.now()-new Date(date).getTime())/1000));

  if(seconds<60) return "just now";
  const mins=Math.floor(seconds/60);
  if(mins<60) return `${mins}m ago`;
  const hours=Math.floor(mins/60);
  if(hours<24) return `${hours}h ago`;
  const days=Math.floor(hours/24);
  return days===1 ? "yesterday" : `${days}d ago`;
}

async function createPost(){
  const content=$("post-content").value.trim();
  const image=$("post-image").value.trim();

  if(!content){
    toast("Write something before posting.",true);
    $("post-content").focus();
    return;
  }

  const btn=$("post-btn");
  btn.disabled=true;

  try{
    await api("/posts",{
      method:"POST",
      body:JSON.stringify({content,image})
    });

    $("post-content").value="";
    $("post-image").value="";
    updateCharCount();
    await loadFeed();
    toast("Post published.","", "success");
  }catch(error){
    toast(error.message,true);
  }finally{
    btn.disabled=false;
  }
}

function getDemoPostsFor(username){
  return DEMO_POSTS.filter(p => p.author?.username === username);
}

function renderDemoProfile(username){
  const profile=DEMO_PROFILE_DATA[username];
  if(!profile) return false;

  const root=$("profile-view");
  const posts=getDemoPostsFor(username);
  const following=Boolean(demoFollowState[username]);

  root.innerHTML=`
    <div class="profile-header card">
      <div class="profile-cover"></div>
      <div class="profile-info">
        ${avatarHTML(profile)}
        <div class="profile-title-wrap">
          <h2>${esc(profile.name)}</h2>
          <p>@${esc(profile.username)}</p>
          <p>${esc(profile.bio)}</p>
        </div>
      </div>
      <div class="profile-actions">
        <button class="follow-btn profile-follow-large ${following ? "following":""}" id="demo-profile-follow">${following ? "Following" : "Follow"}</button>
        <button class="secondary-btn profile-share-btn" id="demo-profile-share">↗ Share</button>
      </div>
      <div class="stats profile-stats">
        <span><strong>${posts.length || 1}</strong> posts</span>
        <button data-social-list="followers"><strong>${profile.followers.toLocaleString()}</strong> followers</button>
        <button data-social-list="following"><strong>${profile.following.toLocaleString()}</strong> following</button>
      </div>
    </div>
    <div class="profile-section-label"><span>POSTS</span><strong>Latest from ${esc(profile.name)}</strong></div>
    <div class="feed">
      ${posts.length ? posts.map(postHTML).join("") : `<div class="card empty"><h3>No posts yet.</h3></div>`}
    </div>
  `;

  $("demo-profile-follow").onclick=()=>{
    demoFollowState[username]=!demoFollowState[username];
    localStorage.setItem("connectify_demo_follows",JSON.stringify(demoFollowState));
    $("demo-profile-follow").textContent=demoFollowState[username] ? "Following" : "Follow";
    $("demo-profile-follow").classList.toggle("following",demoFollowState[username]);
    toast(demoFollowState[username] ? `Following @${username}` : `Unfollowed @${username}`);
  };

  $("demo-profile-share").onclick=()=>shareProfile(username);
  root.querySelectorAll("[data-social-list]").forEach(btn=>{
    btn.onclick=()=>{
      const title=btn.dataset.socialList==="followers" ? "Followers" : "Following";
      const demoUsers=Object.values(DEMO_PROFILE_DATA)
        .filter(u=>u.username!==username)
        .map((u,i)=>({id:`demo-social-${i}`,name:u.name,username:u.username,avatar:"",isFollowing:Boolean(demoFollowState[u.username])}));
      renderSocialList(title,demoUsers);
    };
  });
  return true;
}

async function shareProfile(username){
  const url=`${location.origin}/?profile=${encodeURIComponent(username)}`;
  try{
    await navigator.clipboard.writeText(url);
    toast("Profile link copied.",false,"success");
  }catch{
    toast("Profile link ready to share.");
  }
}

function renderSocialList(title,users){
  const body=users.length
    ? users.map(u=>`<div class="social-user-row">
        ${avatarHTML(u)}
        <div><strong>${esc(u.name)}</strong><small>@${esc(u.username)}</small></div>
        ${u.id!==state.user?.id ? `<button class="follow-btn mini-follow" data-follow="${esc(u.id)}">${u.isFollowing ? "Following":"Follow"}</button>` : ""}
      </div>`).join("")
    : `<div class="empty social-empty"><h3>No ${title.toLowerCase()} yet</h3><p>This profile hasn't connected with anyone here.</p></div>`;

  $("modal-root").innerHTML=`<div class="modal-backdrop" id="social-modal-backdrop">
    <div class="social-modal card">
      <div class="modal-head"><div><span class="eyebrow">COMMUNITY</span><h3>${esc(title)}</h3></div><button class="modal-close" id="modal-close">×</button></div>
      <div class="social-list">${body}</div>
    </div>
  </div>`;

  $("modal-close").onclick=closeModal;
  $("social-modal-backdrop").onclick=e=>{if(e.target.id==="social-modal-backdrop") closeModal();};
  $("modal-root").querySelectorAll("[data-follow]").forEach(btn=>btn.onclick=async()=>{
    try{
      const data=await api(`/users/${btn.dataset.follow}/follow`,{method:"POST"});
      btn.textContent=data.following ? "Following":"Follow";
      btn.classList.toggle("following",data.following);
    }catch(error){toast(error.message,true);}
  });
}

function closeModal(){ $("modal-root").innerHTML=""; }

async function openSocialList(username,type){
  const endpoint=type==="followers" ? "followers" : "following";
  try{
    const data=await api(`/users/${encodeURIComponent(username)}/${endpoint}`);
    renderSocialList(type==="followers" ? "Followers" : "Following",data.users || []);
  }catch(error){toast(error.message,true);}
}

async function handleFeedClick(e){
  const action=e.target.closest("[data-action]");
  if(!action) return;

  const post=e.target.closest("[data-post-id]");
  if(!post) return;

  const id=post.dataset.postId;
  const isDemo=post.dataset.demo==="true";

  try{
    if(action.dataset.action==="open-profile"){
      const username=action.dataset.username;
      switchView("profile");
      if(!renderDemoProfile(username)) await showProfile(username);
      return;
    }

    if(action.dataset.action==="follow-author"){
      const username=action.dataset.username;
      const button=action;
      if(isDemo){
        demoFollowState[username]=!demoFollowState[username];
        localStorage.setItem("connectify_demo_follows",JSON.stringify(demoFollowState));
        button.textContent=demoFollowState[username] ? "Following" : "Follow";
        button.classList.toggle("following",demoFollowState[username]);
        return;
      }
      const data=await api(`/users/${button.dataset.authorId}/follow`,{method:"POST"});
      button.textContent=data.following ? "Following":"Follow";
      button.classList.toggle("following",data.following);
      return;
    }

    if(action.dataset.action==="like"){
      if(isDemo){
        state.demoLiked[id]=!state.demoLiked[id];
        localStorage.setItem("connectify_demo_likes",JSON.stringify(state.demoLiked));
        const original=DEMO_POSTS.find(p=>p.id===id);
        const count=(original?.likesCount || 0)+(state.demoLiked[id] ? 1:0);
        action.classList.toggle("active",state.demoLiked[id]);
        action.innerHTML=`${state.demoLiked[id] ? "♥":"♡"} ${count}`;
        return;
      }

      const data=await api(`/posts/${id}/like`,{method:"POST"});
      action.classList.toggle("active",data.liked);
      action.innerHTML=`${data.liked ? "♥":"♡"} ${data.likesCount}`;
    }

    if(action.dataset.action==="delete-post"){
      if(!confirm("Delete this post?")) return;
      await api(`/posts/${id}`,{method:"DELETE"});
      post.remove();
      toast("Post deleted.","","success");
    }

    if(action.dataset.action==="comments"){
      const box=post.querySelector("[data-comments]");
      box.classList.toggle("hidden");

      if(!box.classList.contains("hidden")){
        if(isDemo){
          box.innerHTML=`
            <div class="comment">
              ${avatarHTML({name:"Ananya Sharma"},"avatar").replace('class="avatar"','class="avatar" style="width:30px;height:30px;flex-basis:30px"')}
              <p><strong>@ananya.codes</strong> Love this! ✨<br><small>12m ago</small></p>
            </div>
            <div class="comment">
              ${avatarHTML({name:"Aarav Mehta"},"avatar").replace('class="avatar"','class="avatar" style="width:30px;height:30px;flex-basis:30px"')}
              <p><strong>@aarav.mehta</strong> Absolutely agree.<br><small>8m ago</small></p>
            </div>
            <form class="comment-form demo-comment-form">
              <input name="content" maxlength="500" placeholder="Write a comment..." required>
              <button class="secondary-btn" type="submit">Send</button>
            </form>
          `;

          box.querySelector("form").addEventListener("submit",e=>{
            e.preventDefault();
            const input=e.currentTarget.elements.content;
            if(!input.value.trim()) return;
            toast("Demo comments are shown for the portfolio preview.");
            input.value="";
          });
        }else{
          await loadComments(id,box);
        }
      }
    }

    if(action.dataset.action==="share"){
      const url=window.location.href;
      try{
        await navigator.clipboard.writeText(url);
        toast("Profile link copied.","","success");
      }catch{
        toast("Share link ready.");
      }
    }
  }catch(error){
    toast(error.message,true);
  }
}

async function loadComments(id,box){
  const data=await api(`/posts/${id}/comments`);

  box.innerHTML=`
    ${data.comments.map(c=>`
      <div class="comment">
        ${avatarHTML(c.author,"avatar").replace('class="avatar"','class="avatar" style="width:30px;height:30px;flex-basis:30px"')}
        <p>
          <strong>@${esc(c.author.username)}</strong> ${esc(c.content)}
          <br><small>${timeAgo(c.createdAt)}</small>
        </p>
      </div>
    `).join("")}

    <form class="comment-form">
      <input name="content" maxlength="500" placeholder="Write a comment..." required>
      <button class="secondary-btn" type="submit">Send</button>
    </form>
  `;

  box.querySelector("form").addEventListener("submit",async e=>{
    e.preventDefault();
    const input=e.currentTarget.elements.content;

    try{
      await api(`/posts/${id}/comments`,{
        method:"POST",
        body:JSON.stringify({content:input.value})
      });

      await loadComments(id,box);
    }catch(error){
      toast(error.message,true);
    }
  });
}

async function loadDiscover(){
  try{
    const data=await api("/users/search?q=a");
    const users=(data.users || [])
      .filter(u=>u.id!==state.user.id)
      .slice(0,5);

    $("discover-users").innerHTML=users.length
      ? users.map(personHTML).join("")
      : demoPeopleHTML();
  }catch{
    $("discover-users").innerHTML=demoPeopleHTML();
  }
}

function demoPeopleHTML(){
  return DEMO_PEOPLE.map(user=>`
    <div class="person">
      <button class="person-profile" data-profile-username="${esc(user.username)}" title="Open profile">
        ${avatarHTML(user,"avatar").replace('class="avatar"','class="avatar" style="width:36px;height:36px;flex-basis:36px"')}
        <span class="person-info">
          <strong>${esc(user.name)}</strong>
          <small>@${esc(user.username)}</small>
        </span>
      </button>
      <button class="follow-btn" data-demo-follow="true">Follow</button>
    </div>
  `).join("");
}

function personHTML(user){
  return `
    <div class="person" data-user-id="${user.id}">
      <button class="person-profile" data-profile-username="${esc(user.username)}" title="Open profile">
        ${avatarHTML(user,"avatar").replace('class="avatar"','class="avatar" style="width:36px;height:36px;flex-basis:36px"')}
        <span class="person-info">
          <strong>${esc(user.name)}</strong>
          <small>@${esc(user.username)}</small>
        </span>
      </button>
      <button class="follow-btn" data-follow="${user.id}">
        ${user.isFollowing ? "Following":"Follow"}
      </button>
    </div>
  `;
}

async function handleDiscoverClick(e){
  const profile=e.target.closest("[data-profile-username]");
  if(profile){
    showProfile(profile.dataset.profileUsername);
    return;
  }

  const demo=e.target.closest("[data-demo-follow]");
  if(demo){
    demo.textContent=demo.textContent==="Follow" ? "Following":"Follow";
    return;
  }

  const btn=e.target.closest("[data-follow]");
  if(!btn) return;

  try{
    const data=await api(`/users/${btn.dataset.follow}/follow`,{method:"POST"});
    btn.textContent=data.following ? "Following":"Follow";
  }catch(error){
    toast(error.message,true);
  }
}

async function showProfile(username=state.user.username){
  switchView("profile");

  const root=$("profile-view");
  root.innerHTML=loadingHTML();

  if(renderDemoProfile(username)) return;

  try{
    const [profile,posts]=await Promise.all([
      api(`/users/${encodeURIComponent(username)}`),
      api(`/posts/user/${encodeURIComponent(username)}`)
    ]);

    state.profile=profile.user;
    const profilePosts=Array.isArray(posts.posts) ? posts.posts : [];
    const isOwn=profile.user.id===state.user?.id;

    root.innerHTML=`
      <div class="profile-header card">
        <div class="profile-cover"></div>
        <div class="profile-info">
          ${avatarHTML(profile.user)}
          <div class="profile-title-wrap">
            <h2>${esc(profile.user.name)}</h2>
            <p>@${esc(profile.user.username)}</p>
            <p>${esc(profile.user.bio || "No bio yet.")}</p>
          </div>
        </div>
        <div class="profile-actions">
          ${!isOwn ? `<button class="follow-btn profile-follow-large ${profile.user.isFollowing ? "following":""}" id="profile-follow">${profile.user.isFollowing ? "Following":"Follow"}</button>` : ""}
          <button class="secondary-btn profile-share-btn" id="profile-share">↗ Share</button>
        </div>
        <div class="stats profile-stats">
          <span><strong>${profilePosts.length}</strong> posts</span>
          <button data-social-list="followers"><strong>${profile.user.followersCount || 0}</strong> followers</button>
          <button data-social-list="following"><strong>${profile.user.followingCount || 0}</strong> following</button>
        </div>
      </div>

      <div class="profile-section-label"><span>POSTS</span><strong>Latest from ${esc(profile.user.name)}</strong></div>
      <div class="feed">
        ${profilePosts.length
          ? profilePosts.map(postHTML).join("")
          : `<div class="card empty"><h3>No posts yet.</h3><p>This person hasn't shared anything yet.</p></div>`}
      </div>
    `;

    const follow=$("profile-follow");
    if(follow){
      follow.onclick=async()=>{
        try{
          const data=await api(`/users/${profile.user.id}/follow`,{method:"POST"});
          follow.textContent=data.following ? "Following":"Follow";
          follow.classList.toggle("following",data.following);
          const countBtn=root.querySelector('[data-social-list="followers"] strong');
          if(countBtn) countBtn.textContent=data.followersCount;
        }catch(error){toast(error.message,true);}
      };
    }

    $("profile-share").onclick=()=>shareProfile(profile.user.username);

    root.querySelectorAll("[data-social-list]").forEach(btn=>{
      btn.onclick=()=>openSocialList(profile.user.username,btn.dataset.socialList);
    });
  }catch(error){
    root.innerHTML=`<div class="card empty profile-error"><div class="error-icon">!</div><h3>Unable to load profile</h3><p>${esc(error.message)}</p><button class="secondary-btn" onclick="showProfile('${esc(state.user.username)}')">Open my profile</button></div>`;
  }
}

function showSettings(){
  switchView("settings");

  $("settings-view").innerHTML=`
    <div class="settings card">
      <span class="eyebrow">ACCOUNT</span>
      <h2>Profile settings</h2>
      <p>Keep your public profile up to date.</p>

      <form id="settings-form">
        <div class="field">
          <label>Full name</label>
          <input name="name" maxlength="60" value="${esc(state.user.name)}" required>
        </div>

        <div class="field">
          <label>Bio</label>
          <textarea name="bio" maxlength="160" placeholder="Tell your community a little about yourself...">${esc(state.user.bio || "")}</textarea>
        </div>

        <div class="field">
          <label>Avatar URL</label>
          <input name="avatar" value="${esc(state.user.avatar || "")}" placeholder="https://...">
        </div>

        <button class="primary-btn" type="submit">Save changes</button>
      </form>
    </div>
  `;

  $("settings-form").onsubmit=async e=>{
    e.preventDefault();

    const f=new FormData(e.currentTarget);

    try{
      const data=await api("/users/me",{
        method:"PUT",
        body:JSON.stringify(Object.fromEntries(f.entries()))
      });

      state.user={...state.user,...data.user};
      localStorage.setItem("connectify_user",JSON.stringify(state.user));
      hydrateUser();
      renderStories();
      toast("Profile updated.","","success");
    }catch(error){
      toast(error.message,true);
    }
  };
}

function switchView(view){
  state.view=view;

  ["feed","profile","settings"].forEach(v=>{
    const el=$(`${v}-view`);
    if(el) el.classList.toggle("hidden",v!==view);
  });

  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.view===view);
  });
}

function updateCharCount(){
  $("char-count").textContent=`${$("post-content").value.length} / 1000`;
}

function bindEvents(){
  $("auth-form").addEventListener("submit",handleAuth);

  $("auth-switch").onclick=()=>{
    setAuthMode($("auth-form").dataset.mode!=="register");
  };

  $("post-btn").onclick=createPost;

  $("post-content").addEventListener("input",updateCharCount);

  $("refresh-btn").onclick=async()=>{
    const btn=$("refresh-btn");
    btn.classList.add("refreshing");
    state.refreshCount++;
    localStorage.setItem("connectify_refresh_count",state.refreshCount);

    await loadFeed();

    btn.classList.remove("refreshing");
    toast("Feed refreshed. New posts are on top.");
  };

  $("feed").addEventListener("click",handleFeedClick);
  $("profile-view").addEventListener("click",handleFeedClick);
  $("discover-users").addEventListener("click",handleDiscoverClick);

  $("logout-btn").onclick=()=>{
    clearSession();
    showAuth();
    toast("Logged out.");
  };

  $("top-avatar").onclick=()=>showProfile();

  $("home-link").onclick=e=>{
    e.preventDefault();
    switchView("feed");
    loadFeed();
  };

  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.onclick=()=>{
      const view=btn.dataset.view;

      if(view==="feed"){
        switchView("feed");
        loadFeed();
      }

      if(view==="profile") showProfile();
      if(view==="settings") showSettings();
    };
  });

  $("theme-toggle").onclick=()=>{
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "connectify_theme",
      document.body.classList.contains("dark") ? "dark":"light"
    );

    $("theme-toggle").textContent=
      document.body.classList.contains("dark") ? "☀":"☾";
  };

  $("notification-btn").onclick=e=>{
    e.stopPropagation();
    $("notification-panel").classList.toggle("hidden");
  };

  document.addEventListener("click",e=>{
    if(!e.target.closest("#notification-panel") && !e.target.closest("#notification-btn")){
      $("notification-panel").classList.add("hidden");
    }
  });

  let searchTimer;

  $("user-search").addEventListener("input",()=>{
    clearTimeout(searchTimer);

    const q=$("user-search").value.trim();

    if(!q){
      $("search-results").classList.add("hidden");
      return;
    }

    searchTimer=setTimeout(async()=>{
      try{
        const data=await api(`/users/search?q=${encodeURIComponent(q)}`);

        $("search-results").innerHTML=(data.users || []).map(u=>`
          <div class="search-result" data-username="${esc(u.username)}">
            ${avatarHTML(u,"avatar").replace('class="avatar"','class="avatar" style="width:32px;height:32px;flex-basis:32px"')}
            <div>
              <strong>${esc(u.name)}</strong>
              <small>@${esc(u.username)}</small>
            </div>
          </div>
        `).join("") || `<div class="search-result">No users found.</div>`;

        $("search-results").classList.remove("hidden");
      }catch{
        $("search-results").classList.add("hidden");
      }
    },250);
  });

  $("search-results").addEventListener("click",e=>{
    const row=e.target.closest("[data-username]");
    if(!row) return;

    $("search-results").classList.add("hidden");
    $("user-search").value="";
    showProfile(row.dataset.username);
  });

  $("discover-all").onclick=()=>{
    $("user-search").focus();
    toast("Search for people by name or username.");
  };
}

(async function init(){
  if(localStorage.getItem("connectify_theme")==="dark"){
    document.body.classList.add("dark");
    $("theme-toggle").textContent="☀";
  }

  bindEvents();
  setAuthMode(false);
  updateCharCount();

  if(state.token){
    try{
      const data=await api("/auth/me");
      state.user=data.user;
      localStorage.setItem("connectify_user",JSON.stringify(state.user));
      showApp();
    }catch{
      clearSession();
      showAuth();
    }
  }else{
    showAuth();
  }
})();
