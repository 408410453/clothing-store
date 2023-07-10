let search = document.querySelector(".topbar_list_search");
let search_icon = document.querySelector(".topbar_list_search_icon");
let search_input = document.querySelector(".topbar_list_search_input");
let search_close = document.querySelector(".topbar_list_search_close");
let search_delete = document.querySelector(".topbar_list_search_delete");

search_icon.addEventListener("click",()=>{
    search.classList.add("topbar_list_search-open");
    search_input.focus();
})

search_close.addEventListener("click",()=>{
    search.classList.remove("topbar_list_search-open");
    search_input.value="";
})

search_delete.addEventListener("click",()=>{
    search_input.value="";
    search_input.focus();
})

// cart delete
function Delete(name){
    var rs = confirm('Confirm to delete?');
    if (rs) {
      window.location.href = "/cart/"+name;
  }
  }

