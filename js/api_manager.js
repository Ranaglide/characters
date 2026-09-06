// base url for api
const base_url = "https://genshin.jmp.blue"


// gets list of characters and their info, returns result in callback function
const get_characters_list = async (callback) => {
    fetch(`${base_url}/characters/all`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then(r => r.json()).then(response => {
        callback(response)
    })
}

get_characters_list((r)=>{
    console.log(r);
    
})