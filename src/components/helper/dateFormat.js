const monthMap = {
    "12": "December",
    "11": "November",
    "10": "October",
    "09": "September",
    "08": "August",
    "07": "July",
    "06": "June",
    "05": "May",
    "04": "April",
    "03": "March",
    "02": "February",
    "01": "January"
}

/**
 * Grabs the date string from plaid response and converts it into 
 * month year format. Ex: 2000-10-17 => October 2000
 * 
 * @param {String} date Date as a string in the form yyyy-mm-dd 
 * @returns formated month and year
 */
export const monthFormat = date => {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);

    return `${year} ${monthMap[month]}`;
}

/**
 * Grabs the date string from plaid response and converts it into
 * month day format. Ex: 2000-10-17 => October 17
 * 
 * @param {String} date Date as a string in the form yyyy-mm-dd 
 * @returns formatted day and month
 */
export const dayFormat = date => {
    let day = date.substring(8);
    let month = date.substring(5, 7);

    return `${monthMap[month]} ${parseInt(day)}`;
}