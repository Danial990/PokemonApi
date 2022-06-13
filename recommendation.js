

// getting all required elements
const searchWrapper = document.querySelector(".search-input")
const inputBox = document.querySelector("input")
const suggBox = document.querySelector(".autocom-box")

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; // user entered name
    let emptyArray = [];
    if (userData) {
        emptyArray = suggestion.filter((data) => {
            // filtering array value and user char to lowercase 
            // and return only those words which are starts with user entered word
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            return data = '<li>' + data + '</li>';
        });

        searchWrapper.classList.add("active"); //show auto complete Box
        showSuggestion(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            // adding onclick attribute in al li tag
            allList[i].setAttribute("onclick", "select(this)");

        }
    } else {
        searchWrapper.classList.remove("active"); //hide auto complete Box
    }
}

function select(element) {
    let selectUserData = element.textContent;
    inputBox.value = selectUserData // passing the user selected list item data in textfield

    // pokemons.map(() => {
    //     if (pokemons.name == selectUserData) {
    //         pokemons.element.classList.toggle("hide");
    //     }
    // })
}

function showSuggestion(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>'
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}