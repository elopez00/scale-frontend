/**
 * This function converts long num values to a comma separated number. This
 * will allow for more readable number values
 * 
 * @param {Number} num number that will be adjusted with commas
 * @returns prettified num
 */
export const prettifyNum = (num) => {
    const absAmount = "$" + Math.abs(num)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return num >= 0 ? absAmount : "-" + absAmount;
};