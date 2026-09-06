// create element with all tags by character data
const create_character_card = (character) => {

    // root element of character
    let root = document.createElement("div")
    root.classList.add("character")
    root.classList.add("clickable")

    // root for avatar
    let avatar_root = document.createElement("div")
    avatar_root.classList.add("character__avatar")

    // img for card
    let card_img = document.createElement("img")
    card_img.classList.add("character__card")
    card_img.src = `${base_url}/characters/${character.id}/card`
    avatar_root.appendChild(card_img)

    // character info
    let character_info = document.createElement("div")
    character_info.classList.add("character__info")
    avatar_root.appendChild(character_info)

    // stars
    let character__stars = document.createElement("div")
    character__stars.classList.add("character__stars")
    for (let s = 0; s < character.rarity; s++) {
        let star = document.createElement("img")
        star.classList.add("character__star")
        star.src = "img/icons/star.svg"
        character__stars.appendChild(star)
    }
    character_info.appendChild(character__stars)

    // character element and weapon
    let character_fighting = document.createElement("div")
    character_fighting.classList.add("character__fighting")

    let character_weapon = document.createElement("img")
    character_weapon.src = `img/weapons/${character.weapon}.png`
    character_fighting.appendChild(character_weapon)
    let character_element = document.createElement("img")
    character_element.src = `img/elements/${character.vision}.png`
    character_fighting.appendChild(character_element)

    character_info.appendChild(character_fighting)

    // identifier
    let character_identifier = document.createElement("div")
    character_identifier.classList.add("character__identifier")

    let character_name = document.createElement("div")
    character_name.classList.add("character__name")
    character_name.textContent = character.name
    character_identifier.appendChild(character_name)

    let character_title = document.createElement("div")
    character_title.classList.add("character__title")
    character_title.textContent = character.title
    character_identifier.appendChild(character_title)

    root.appendChild(avatar_root)
    root.appendChild(character_identifier)

    return root
}