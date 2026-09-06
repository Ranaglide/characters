const list = document.getElementById("list")
const loader = document.getElementById("list-loader")

get_characters_list((characters)=>{
    // clear list
    list.innerHTML = ""
    loader.remove()

    // fill list with all characters
    characters.forEach(character => {
        list.appendChild(
            create_character_card(character)
        )        
    });
})