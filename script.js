const pokemonData = document.querySelector("[data-user-template]")
const pokemonDataContainer = document.querySelector("[data-pokemon-cards-container]")
const searchInput = document.querySelector("[data-search]")
const props = [];

let datas;
let pokemons = [];
let wholeData = {};

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    // console.log(pokemons)
    if (value) {
        pokemons.forEach(data => {
            const isVisible = data.name.includes(value);
            data.element.classList.toggle("hide", isVisible);
        })
    } else {
        pokemons.forEach(data => {
            data.element.classList.remove("hide")
        })
    }
})



function test() {
    for (let index = 1; index <= 20; index++) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + `${index}`)
            .then(results => results.json())
            .then(infos => {
                const h = infos.height;
                const w = infos.weight;
                const n = infos.name;
                const a = infos.abilities;

                const t = infos.types[0].type.name;

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

                props[index - 1] = { h, w, n, a, t, t1, v, v1, v2 };

            })
    }
    return props;
}
test();

fetch('https://pokeapi.co/api/v2/pokemon/')

    .then(res => res.json())
    .then(data => {
        pokemons = data.results.map(user => {
            const card = pokemonData.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]")
            const img = card.querySelector("[data-img]")
            const type = card.querySelector("[data-type-body]")
            const height = card.querySelector("[data-height]")
            const weight = card.querySelector("[data-weight]")
            const abilities = card.querySelector("[data-abilities]")

            let c = 0;
            props.map(arr => {

                if (arr.n == user.name) {
                    header.textContent = user.name;
                    height.textContent = 'height: ' + props[c].h;
                    weight.textContent = 'weight: ' + props[c].w;
                    type.textContent = props[c].t + ' ' + props[c].t1;
                    abilities.textContent = 'abilities: ' + props[c].v + ' ' + props[c].v1 + ' ' + props[c].v2
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
                pokemonDataContainer.append(card)
                return wholeData = { ...datas, element: card }
            })
            // console.log(pokemons);
            return pokemons = wholeData;
        })
    })

