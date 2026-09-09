// definition of base contant elements and variables
const list = document.getElementById("list")
const loader = document.getElementById("list-loader")
let characters = []
let characters_filtered = []
let filters = {
    elements: ["pyro", "cryo", "dendro", "geo", "anemo", "hydro", "electro"],
    weapons: ["claymore", "sword", "bow", "polearm", "catalyst"]
}

// function to fill characters list with data of "characters" variable
const fill_characters_list = () => {
    list.innerHTML = ""
    loader.remove()
    characters_filtered.forEach(character => {
        list.appendChild(
            create_character_card(character)
        )
    });
}

// change filters of characters by "filters" variable and then fill list
const filter_characters = () => {

    characters_filtered = characters.filter((character) => {
        const vision = character.vision_key.toLowerCase()
        const weapon = character.weapon_type.toLowerCase()

        return filters.elements.includes(vision) ?
            filters.weapons.includes(weapon) ? true
                :
                false : false
    })
}

// fill data on first load of page
get_characters_list((data) => {
    console.log(data);
    
    characters = data
    filter_characters()
    fill_characters_list()
})