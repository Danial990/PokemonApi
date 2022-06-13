// getting all required elements
const searchWrapper = document.querySelector(".search-wrapper")
const inputBox = document.querySelector("[data-search]")
const suggBox = document.querySelector(".recommendation")

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; // user entered name
    let emtpyArray = [];
    if (userData) {
        emtpyArray = suggestion.filter((data) => {
            // filtering array value and user char to lowercase 
            // and return only those words which are starts with user entered word
            return data.toLocaleLowerCase().startsWith(userData);
        });
        emtpyArray = emtpyArray.map((data) => {
            return data = '<li>' + data + '</li>';
        });
        console.log(emtpyArray)
        searchWrapper.classList.add("active");
    } else {

    }
    showSuggestion(emtpyArray);
}

function showSuggestion(list) {
    let listData;
    if (!list.lenght) {

    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}