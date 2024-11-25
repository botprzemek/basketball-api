export const isEntityValid = <Entity>(entity: unknown): entity is Entity =>
    !!entity && typeof entity === "object";

export const entityHasField = <Entity extends object>(
    field: keyof Entity,
    entity: Entity,
): boolean => field in entity;

export const isFieldValid = <Field>(
    value: unknown,
    expression: RegExp,
): value is Field =>
    (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean") &&
    expression.test(value.toString());

export default {
    isEntityValid,
    isFieldValid,
};
