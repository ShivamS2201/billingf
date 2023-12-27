const GSTValidator = {
    GSTINFORMAT_REGEX: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,

    validateGST: function (gstNumber) {
        const isValidFormat = this.isValidFormat(gstNumber);
        const isValidCheckDigit = this.verifyCheckDigit(gstNumber);

        console.log('isValidFormat:', isValidFormat);
        console.log('isValidCheckDigit:', isValidCheckDigit);

        if (isValidFormat && isValidCheckDigit) {
            console.log("Valid GST Number!");
        } else {
            console.log("Invalid GST Number.");
        }
    },

    isValidFormat: function (gstNumber) {
        const result = this.GSTINFORMAT_REGEX.test(gstNumber);
        console.log('Format Validation Result:', result);
        return result;
    },

    verifyCheckDigit: function (gstNumber) {
        const calculatedCheckDigit = this.calculateCheckDigit(gstNumber.slice(0, -1));
        const providedCheckDigit = gstNumber.trim().toUpperCase().charAt(gstNumber.length - 1);

        console.log('Calculated Check Digit:', calculatedCheckDigit);
        console.log('Provided Check Digit:', providedCheckDigit);

        return calculatedCheckDigit === providedCheckDigit;
    },

    calculateCheckDigit: function (gstinWOCheckDigit) {
        const cpChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const sum = gstinWOCheckDigit.toUpperCase().split('').reduce((acc, char, index) => {
            const codePoint = char.charCodeAt(0) < 65 ? parseInt(char) : char.charCodeAt(0) - 55;
            const digit = (codePoint * (index % 2 + 1));
            return acc + (digit > 36 ? 1 + (digit - 36) : digit);
        }, 0);

        const mod = 36;
        const checkCodePoint = (mod - (sum % mod)) % mod;
        const calculatedCheckDigit = cpChars[checkCodePoint];

        console.log('Sum:', sum);
        console.log('Check Code Point:', checkCodePoint);
        console.log('Calculated Check Digit:', calculatedCheckDigit);

        return calculatedCheckDigit;
    }
};

// Example usage:
GSTValidator.validateGST('22AAAAA0000A1Z5'); // Should print "Valid GST Number!"
//GSTValidator.validateGST('22AAAAA0000A1Z4'); // Should print "Invalid GST Number."
