// Utility functions.
import {GENERATOR_KEY} from "../data/constants"

// Get parameters for the password generator.
export const getLocalParameters = () => {
    return localStorage.getItem(GENERATOR_KEY) ? JSON.parse(localStorage.getItem(GENERATOR_KEY)) : {}
}

// Update the slider bar progress.
export const sliderProgress = () => {
    const parameters = JSON.parse(localStorage.getItem('generator')) ?? {}
    // Progress bar for the password generator length.
    // Thank you https://github.com/toughengineer!
    const slider = document.querySelector('input[type="range"].slider-progress')
    // Get the length from local storage or use the default value.
    slider.style.setProperty('--value', parameters.length ?? slider.value)
    slider.style.setProperty('--min', slider.min === '' ? '0' : slider.min)
    slider.style.setProperty('--max', slider.max === '' ? '100' : slider.max)
    slider.addEventListener('input', () => slider.style.setProperty('--value', slider.value))

    return () => {
        slider.removeEventListener('input', () => {
            slider.style.setProperty('--value', slider.value)
        })
    }
}