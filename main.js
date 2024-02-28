import axios from "axios";

// axios.get("https://api.warframestat.us/pc/fissures/")
// .then((response) => {
//     const data = response.data
//     const finalNormalList = []
//     const finalSteelPathList = []
//     let temp = 0
//     let temp2 = 0
//     for (let value in data) {
//         let dict = data[value]
//         if (dict['active'] == true && dict['isStorm'] == false && dict['isHard'] == false){
//             let node = dict['node']
//             let missionType = dict['missionType']
//             let tier = dict['tier']
//             let newDict = {
//                 'node' : node,
//                 'missionType' : missionType,
//                 'tier' : tier
//             }
//             finalNormalList[temp] = newDict
//             temp++
//         }
//         if (dict['active'] == true && dict['isStorm'] == false && dict['isHard'] == true){
//             let node = dict['node']
//             let missionType = dict['missionType']
//             let tier = dict['tier']
//             let newDict = {
//                 'node' : node,
//                 'missionType' : missionType,
//                 'tier' : tier
//             }
//             finalSteelPathList[temp2] = newDict
//             temp2++
//         }
//     }
//     console.log(finalNormalList)
//     console.log(finalSteelPathList)
// })
// .catch((error) => console.log(error));

const warframeLinkDict = {
    'Ash Prime' : "https://api.warframe.market/v1/items/ash_prime_set/orders",
    'Atlas Prime' : "https://api.warframe.market/v1/items/atlas_prime_set/orders",
    'Banshee Prime' : "https://api.warframe.market/v1/items/banshee_prime_set/orders",
    'Baruuk Prime' : "https://api.warframe.market/v1/items/baruuk_prime_set/orders",
    'Chroma Prime' : "https://api.warframe.market/v1/items/chroma_prime_set/orders",
    'Ember Prime' : "https://api.warframe.market/v1/items/ember_prime_set/orders",
    'Equinox Prime' : "https://api.warframe.market/v1/items/equinox_prime_set/orders",
    'Frost Prime' :  "https://api.warframe.market/v1/items/frost_prime_set/orders",
    'Gara Prime' : "https://api.warframe.market/v1/items/gara_prime_set/orders", 
    'Garuda Prime' : "https://api.warframe.market/v1/items/garuda_prime_set/orders",
    'Gauss Prime' : "https://api.warframe.market/v1/items/gauss_prime_set/orders",
    'Grendel Prime' : "https://api.warframe.market/v1/items/grendel_prime_set/orders",
    'Harrow Prime' : "https://api.warframe.market/v1/items/harrow_prime_set/orders",
    'Hildryn Prime' : "https://api.warframe.market/v1/items/hildryn_prime_set/orders",
    'Hydroid Prime' : "https://api.warframe.market/v1/items/hydroid_prime_set/orders",
    'Inaros Prime' : "https://api.warframe.market/v1/items/inaros_prime_set/orders", 
    'Ivara Prime' : "https://api.warframe.market/v1/items/ivara_prime_set/orders", 
    'Khora Prime' : "https://api.warframe.market/v1/items/khora_prime_set/orders", 
    'Limbo Prime' : "https://api.warframe.market/v1/items/limbo_prime_set/orders",
    'Loki Prime' : "https://api.warframe.market/v1/items/loki_prime_set/orders", 
    'Mag Prime' : "https://api.warframe.market/v1/items/mag_prime_set/orders",
    'Mesa Prime' : "https://api.warframe.market/v1/items/mesa_prime_set/orders",
    'Mirage Prime' : "https://api.warframe.market/v1/items/mirage_prime_set/orders",
    'Nekros Prime' : "https://api.warframe.market/v1/items/nekros_prime_set/orders",
    'Nezha Prime' : "https://api.warframe.market/v1/items/nezha_prime_set/orders",
    'Nidus Prime' : "https://api.warframe.market/v1/items/nidus_prime_set/orders",
    'Nova Prime' : "https://api.warframe.market/v1/items/nova_prime_set/orders",
    'Nyx Prime' : "https://api.warframe.market/v1/items/nyx_prime_set/orders",
    'Oberon Prime' : "https://api.warframe.market/v1/items/oberon_prime_set/orders",
    'Octavia Prime' : "https://api.warframe.market/v1/items/octavia_prime_set/orders",
    'Revenant Prime' : "https://api.warframe.market/v1/items/revenant_prime_set/orders",
    'Rhino Prime' : "https://api.warframe.market/v1/items/rhino_prime_set/orders",
    'Saryn Prime' : "https://api.warframe.market/v1/items/saryn_prime_set/orders",
    'Titania Prime' : "https://api.warframe.market/v1/items/titania_prime_set/orders",
    'Trinity Prime' : "https://api.warframe.market/v1/items/trinity_prime_set/orders",
    'Valkyr Prime' : "https://api.warframe.market/v1/items/valkyr_prime_set/orders",
    'Vauban Prime' : "https://api.warframe.market/v1/items/vauban_prime_set/orders",
    'Volt Prime' : "https://api.warframe.market/v1/items/volt_prime_set/orders",
    'Wisp Prime' : "https://api.warframe.market/v1/items/wisp_prime_set/orders",
    'Wukong Prime' : "https://api.warframe.market/v1/items/wukong_prime_set/orders",
    'Zephyr Prime' : "https://api.warframe.market/v1/items/zephyr_prime_set/orders"
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function warfarm() {
    for (let x in warframeLinkDict){
        axios.get(warframeLinkDict[x])
        .then((response) => {
            const data = response.data
            let payload = data['payload']
            let orders = payload['orders']
            let price = 0
            for (let dict in orders){
                let newDict = orders[dict]
                let userInfoDIct = newDict['user']
                if (newDict['visible'] == true && userInfoDIct['status'] == 'online' && newDict['order_type'] == 'sell'){
                    if (price == 0) {
                        price = newDict['platinum']
                    }
                    if ( price > newDict['platinum']){
                        price = newDict['platinum']
                }
            }
        }
        console.log(x, ":", price)
        })
        await timer(1000)
    }
}

warfarm()