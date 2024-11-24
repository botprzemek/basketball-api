const expressions = {
    UUID: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    USERNAME: /^([a-zA-Z0-9._\-]){5,}$/,
    PASSWORD: /^(?!.*(.)\1\1).{8,}$/,
};

export const isIdValid = (uuid: unknown): uuid is UUID =>
    typeof uuid === "string" && expressions.UUID.test(uuid);

export const isUsernameValid = (username: unknown): username is string =>
    typeof username === "string" && expressions.USERNAME.test(username);

export const isPasswordValid = (password: unknown): password is string =>
    typeof password === "string" && expressions.PASSWORD.test(password);

export const isUserCreateValid = (user: unknown): user is User.Create => {
    if (!user || typeof user !== "object") {
        return false;
    }

    if (!("username" in user) || !("password" in user)) {
        return false;
    }

    return isUsernameValid(user.username) && isPasswordValid(user.password);
};

export default {
    isIdValid,
    isUsernameValid,
    isPasswordValid,
};
