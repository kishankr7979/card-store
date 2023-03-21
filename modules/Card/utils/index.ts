export const formatSetCcNumber = (cardNumber: string) => {
    const inputVal = cardNumber.replace(/ /g, ""); //remove all the empty spaces in the input
    let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

    if (inputNumbersOnly.length > 16) {
        //If entered value has a length greater than 16 then take only the first 16 digits
        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
    }

    // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
        spacedNumber = splits.join(" "); // Join all the splits with an empty space
    }

    return spacedNumber // Set the new CC number
};

export const listOfBg = [
    '/cards/cc_1.png',
    '/cards/cc_2.png',
    '/cards/cc_3.png'
]