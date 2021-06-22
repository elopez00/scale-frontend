/**
 * This function converts long num values to a comma separated number. This
 * will allow for more readable number values
 * 
 * @param {Number} num number that will be adjusted with commas
 * @returns prettified num
 */
export const prettifyNum = (num) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");