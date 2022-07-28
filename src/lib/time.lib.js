export const remainingTime = (time) => {
    time = Date.parse(new Date()) + (1000 * time) - Date.parse(new Date())
    let seconds = leadingZero(Math.floor((time / 1000) % 60));
    let minutes = leadingZero(Math.floor((time / 1000 / 60) % 60));

    return `${minutes}:${seconds}`;
}

const leadingZero = (num) => {
    if (num < 10) {
        return '0' + num;
    }

    return num;
}