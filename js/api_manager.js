const base_url = "https://genshin.jmp.blue"

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
    console.log(r)
})