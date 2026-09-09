// contstants for lists of buttons
const elements_btns = [...document.getElementById("filter-elements").children]
const weapons_btns = [...document.getElementById("filter-weapons").children]

// onclick for elements filters
elements_btns.forEach(element => { 
    // get element
    let vision = element.getAttribute("vision")    
    
    element.addEventListener("click", () => {
        element.classList.toggle("active")

        // remove/add element from/to filters depended on activity status
        if (!element.classList.contains("active")) {
            filters = {
                ...filters,
                elements: filters.elements.filter((v) => v != vision)
            }
        } else {
            filters.elements.push(vision)
        }

        // update filtered characters list and fill
        filter_characters()
        fill_characters_list()
    })
});

// onclick for weapons filters
weapons_btns.forEach(weapon => {
    // get element
    let weapon_type = weapon.getAttribute("weapon")

    weapon.addEventListener("click", () => {
        weapon.classList.toggle("active")

        // remove/add element from/to filters depended on activity status
        if (!weapon.classList.contains("active")) {
            filters = {
                ...filters,
                weapons: filters.weapons.filter((v) => v != weapon_type)
            }
        } else {
            filters.weapons.push(weapon_type)
        }
        
        // update filtered characters list and fill
        filter_characters()
        fill_characters_list()
    })
});
