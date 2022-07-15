// Utility functions.
import {GENERATOR_KEY} from "../data/constants"

export const getLocalParameters = () => {
    return localStorage.getItem(GENERATOR_KEY) ? JSON.parse(localStorage.getItem(GENERATOR_KEY)) : {}
}