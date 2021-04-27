export const locationFromUrl = () => {
    const location = getStringFromUrl(window.location.pathname.split('/')[1])
    const branch = getStringFromUrl(window.location.pathname.split('/')[2])
    return {location, branch}
}

export const getStringFromUrl = (str) => {
    return str ? str.split('-').join(' ') : null;
}

export const setLocationToUrl = (str) => {
    return str ? str.split(' ').join('-') : null;
}