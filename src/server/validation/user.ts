const TEST_UUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
const TEST_USERNAME = /^([a-zA-Z0-9._\-]){5,}$/;
const TEST_PASSWORD = /^(?!.*(.)\1\1).{8,}$/;

// TODO
// FIX UUID REGEX

export const isIdValid = (uuid: unknown): uuid is UUID =>
    typeof uuid === "string" && TEST_UUID.test(uuid);

export const isUsernameValid = (username: unknown): username is string =>
    typeof username === "string" && TEST_USERNAME.test(username);

export const isPasswordValid = (password: unknown): password is string =>
    typeof password === "string" && TEST_PASSWORD.test(password);
