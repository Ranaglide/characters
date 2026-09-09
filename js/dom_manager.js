// constants for elements
const overlay = document.getElementById("overlay")
const close_overlay_btn = document.getElementById("close-btn")
const overlay_background = document.getElementById("overlay-bg")


// onerror functions for overlay bg, overlay card, talent icon and list card
const panel_bg = overlay.querySelector(".panel__img-bg")
panel_bg.onerror = () => { panel_bg.src = "img/onerror/namecard.png" }

const panel_main = overlay.querySelector(".panel__img-main")
panel_main.onerror = () => { panel_main.src = "img/onerror/portrait.svg" }

const card_onerror_src = "img/onerror/card.svg"
const talent_onerror_src = "img/onerror/icon.svg"


// close overlay function
const close_overlay = () => {
    overlay.classList.remove("active")
}

// open and fill overlay with character data
const open_overlay = (character) => {

    // scroll panel to zeroes
    overlay.querySelector(".overlay__panel").scrollTo(0, 0)
    overlay.classList.add("active")

    // clear and set background for avatar
    overlay.querySelector(".panel__img-bg").src = ``
    overlay.querySelector(".panel__img-bg").src = `${base_url}/characters/${character.id}/namecard-background`

    // clear and set main image for avatar
    overlay.querySelector(".panel__img-main").src = ``
    overlay.querySelector(".panel__img-main").src = `${base_url}/characters/${character.id}/portrait`

    // set name of character
    overlay.querySelector(".general__name").textContent = character.name

    // set title of character
    overlay.querySelector(".general__title").textContent = character.title

    // fill rarity with stars
    let stars_wrapper = overlay.querySelector(".character__stars")
    stars_wrapper.innerHTML = ``
    for (let s = 0; s < character.rarity; s++) {
        let star = document.createElement("img")
        star.classList.add("character__star")
        star.src = "img/icons/star.svg"
        stars_wrapper.appendChild(star)
    }

    // set weapon image icon
    overlay.querySelector(".character__weapon").src = `img/weapons/${character.weapon_type}.png`

    // set element image icon
    overlay.querySelector(".character__element").src = `img/elements/${character.vision_key}.png`

    // set description if exists. else no description
    overlay.querySelector(".panel__description").textContent = character.description.length ? character.description : "This character has no description."

    // set birthday if exists. else no birthday
    overlay.querySelector(".panel__birthday").textContent = character.birthday != "Unknown" ? `Birthday: ${character.birthday.slice(5)}` : "This character has no birthday."

    // set nation if exists. else no nation
    overlay.querySelector(".panel__nation").textContent = character.nation != "Unknown" ? `Nation: ${character.nation}` : "This character has no nation."


    // get talents wrapper element and clear it
    let talents_wrapper = overlay.querySelector(".talents__wrapper")
    talents_wrapper.innerHTML = ``

    // declare all talents array and first 3 skills images
    let talents = [...character.skillTalents, ...character.passiveTalents]
    let images_by_indexes = ["talent-na", "talent-skill", "talent-burst"]
    console.log(talents);


    // for each talent create talent element with name, description and image
    talents.forEach((talent, index) => {
        let item = document.createElement("div")
        item.classList.add("talents__item")

        let talent_icon = new Image()
        talent_icon.classList.add("talent__icon")
        talent_icon.onerror = () => talent_icon.src = talent_onerror_src

        // for first 3 get from `images_by_indexes` array, continue with talent-passive-0,1,2,3 and so on. For traveller for some reason indexes start with 1
        talent_icon.src = `${base_url}/characters/${character.id}/${index < 3 ? images_by_indexes[index] : `talent-passive-${index - (character.name === "Traveler" ? 2 : 3)}`}`
        item.appendChild(talent_icon)

        let talent_info = document.createElement("div")
        talent_info.classList.add("talent__info")
        item.appendChild(talent_info)

        let talent_title = document.createElement("div")
        talent_title.classList.add("talent__title")
        talent_title.textContent = talent.name
        talent_info.appendChild(talent_title)

        let talent_description = document.createElement("div")
        talent_description.classList.add("talent__description")
        talent.description.split("\n").forEach(paragraph => {
            let paragraph_element = document.createElement("div")
            paragraph_element.classList.add("talent__paragraph")
            paragraph_element.textContent = paragraph
            talent_description.appendChild(paragraph_element)
        });
        talent_info.appendChild(talent_description)

        talents_wrapper.appendChild(item)
    });
}

// close overlay by clicking on close button or dark area
overlay_background.addEventListener("click", close_overlay)
close_overlay_btn.addEventListener("click", close_overlay)


// create element with all tags by character data
const create_character_card = (character) => {

    // root element of character
    let root = document.createElement("div")
    root.classList.add("character")
    root.classList.add("clickable")
    root.addEventListener("click", () => open_overlay(character))

    // root for avatar
    let avatar_root = document.createElement("div")
    avatar_root.classList.add("character__avatar")

    // img for card
    let card_img = new Image()
    card_img.onerror = () => card_img.src = card_onerror_src
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
    character_weapon.setAttribute("weapon", character.weapon)
    character_fighting.appendChild(character_weapon)
    let character_element = document.createElement("img")
    character_element.src = `img/elements/${character.vision}.png`
    character_weapon.setAttribute("element", character.vision)
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


    // add picture and name to root element 
    root.appendChild(avatar_root)
    root.appendChild(character_identifier)

    return root
}