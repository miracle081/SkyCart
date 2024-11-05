export function dateTime(timestamp) {
    const now = new Date(timestamp ||new Date().getTime());
    let hr = now.getHours();
    let min = now.getMinutes();
    let day = now.getDate();
    let mon = now.getMonth() + 1;
    let yr = now.getFullYear();
    let amp = "am";

    if (min <= 9) {
        min = `0${min}`;
    }
    if (hr >= 12) {
        hr = hr - 12;
        if (hr == 0) {
            hr = 12
        }
        amp = "pm";
    }
    const savedate = `${day}/${mon}/${yr}, ${hr}:${min}${amp}`;
    return savedate;
}

export function generateRef(length) {
    const key = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890`;
    let alphaNumeric = "";
    for (let i = 0; i < length; i++) {
        alphaNumeric += key.charAt(Math.floor(Math.random() * key.length))
    }
    return alphaNumeric;
}

export function getFutureTimestamp(days) {
    const nextTimestamp = Date.now() + (days * 24 * 60 * 60 * 1000);
    return nextTimestamp;
}