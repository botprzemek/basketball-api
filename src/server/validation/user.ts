import {
    entityHasField,
    isEntityValid,
    isFieldValid,
} from "@/server/validation/index";

const expressions: { [key in keyof User.Entity]: RegExp } = {
    id: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    identity_id:
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    username: /^([a-zA-Z0-9._\-]){5,}$/,
    password: /^(?!.*(.)\1\1).{8,}$/,
    recovery_email: /^$/,
    refresh_token: /^$/,
    verification_token: /^$/,
    logged_at: /^$/,
    deleted_at: /^$/,
    is_deleted: /^true$/,
};

export const isIdValid = (id: unknown) =>
    isFieldValid<UUID>(id, expressions.id);

export const isUsernameValid = (username: unknown) =>
    isFieldValid<string>(username, expressions.username);

export const isUserCreateValid = (user: unknown): user is User.Create => {
    if (!isEntityValid<User.Create>(user)) {
        return false;
    }

    const fields = ["username", "password"] satisfies Array<keyof User.Create>;

    const hasFields = fields.some((field) => entityHasField(field, user));

    if (!hasFields) {
        return false;
    }

    return !fields.some(
        (field) => !isFieldValid<string>(user[field], expressions[field]),
    );
};

export const isUserUpdateValid = (user: unknown): user is User.Update => {
    if (!isEntityValid<User.Update>(user)) {
        return false;
    }

    const fields = [
        "identity_id",
        "username",
        "password",
        "recovery_email",
        "refresh_token",
        "verification_token",
        "logged_at",
        "deleted_at",
        "is_deleted",
    ] satisfies Array<keyof User.Update>;

    return !fields.some((field) => {
        if (!entityHasField(field, user)) {
            return false;
        }

        return isFieldValid<string>(user[field], expressions[field]);
    });
};

export default {
    isIdValid,
    isUserCreateValid,
    isUserUpdateValid,
};
