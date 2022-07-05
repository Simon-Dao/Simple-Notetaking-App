import { atom } from "recoil";

//selectedPage values: notebooks, pages

export default atom({

    key: 'selectedPageState',
    default: 'pages'
})