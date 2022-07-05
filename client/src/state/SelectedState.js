import { atom } from "recoil";

//selectedPage values: notebooks, pages

export default atom({

    key: 'selectedState',
    default: {
        selectedWebpage:  'notebooks',
        selectedNotebook: 'none',
        selectedPage:     'none'
    }
})