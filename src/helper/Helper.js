function convertTimeTo12HourFormat(time24="") {
    // Split the input time by colon
    if(!time24) return
    const [hour, minute] = time24.split(':');

    // Convert hour to number and determine if it's PM
    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format (0 is treated as 12)

    // Format the time string
    return `${hour12}:${minute} ${isPM ? 'PM' : 'AM'}`;
}


export {
    convertTimeTo12HourFormat
}