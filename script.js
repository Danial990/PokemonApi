const template = document.querySelector("[data-user-template]")
const templateCards = document.querySelector("[data-pokemon-cards-container]")
const searchInput = document.querySelector("[data-search]")
const props = [];

let datas;
var pokemonsData = [];
let wholeData = {};

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value) {
        pokemonsData.forEach(data => {
            const isVisible = data.name.includes(value);
            data.element.classList.toggle("hide", isVisible);
        })
    } else {
        pokemonsData.forEach(data => {
            data.element.classList.remove("hide");
        })
    }
})



//reading each pokemons datas link 1~20 and saving their infos in an array
function test() {
    for (let index = 1; index <= 20; index++) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + `${index}`)
            .then(results => results.json())
            .then(infos => {
                const personlyHeight = infos.height;
                const personlyWeight = infos.weight;
                const personlyName = infos.name;
                const personlyAbility = infos.abilities;
                const personlyType = infos.types[0].type.name;
                const image = '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + `${index}` + '.png" />'

                let t1 = '';
                if (infos.types[1]) {
                    t1 = ', ' + infos.types[1].type.name;
                }


                const v = infos.abilities[0].ability.name;

                let v1 = '';
                if (infos.abilities[1]) {
                    v1 = ', ' + infos.abilities[1].ability.name;
                }

                let v2 = '';
                if (infos.abilities[2]) {
                    v2 = ', ' + infos.abilities[2].ability.name;
                }

                // let v = []
                // for (let [prop, value] of Object.entries(infos.abilities)) {
                //     v[props] = value.ability.name;
                // }
                // console.log(v);

                props[index - 1] = { personlyHeight, personlyWeight, personlyName, personlyAbility, personlyType, t1, v, v1, v2, image };
            })
    }
    // console.log(props);
    return props;
}

test();


// reading main link
fetch('https://pokeapi.co/api/v2/pokemon/')

    .then(res => res.json())
    .then(data => {
        pokemonsData = data.results.map(user => {
            // selecting template elements
            const card = template.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const img = card.querySelector("[data-img]");
            const type = card.querySelector("[data-type-body]");
            const height = card.querySelector("[data-height]");
            const weight = card.querySelector("[data-weight]");
            const abilities = card.querySelector("[data-abilities]");

            let c = 0;
            // assigning the data of each Pokemon to its name selected above.
            props.map(arr => {

                if (arr.personlyName == user.name) {
                    header.textContent = user.name;
                    height.textContent = 'height: ' + props[c].personlyHeight;
                    weight.textContent = 'weight: ' + props[c].personlyWeight;
                    type.textContent = props[c].personlyType + ' ' + props[c].t1;
                    abilities.textContent = 'abilities: ' + props[c].v + ' ' + props[c].v1 + ' ' + props[c].v2;
                    img.innerHTML = props[c].image;
                    datas = {
                        name: header.textContent,
                        hegiht: height.textContent,
                        weight: weight.textContent,
                        type: type.textContent,
                        abilities: abilities.textContent
                    }
                } else {
                    c++;
                }
                templateCards.append(card);
                return wholeData = { ...datas, element: card };
            });
            // console.log(pokemonsData);
            return pokemonsData = wholeData;
        });
    })
// });

