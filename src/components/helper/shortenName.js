/**
 * Gets a name with unkown length and reduces it to elipses when its too long
 * 
 * @param {String} name name with unkown length 
 * @returns shortened name string
 */
export const shortenName = name => {
    if (name.length < 20) return name;
    return `${name.substring(0, 15)}...`;
}