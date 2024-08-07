import Create from "@/services/data/database/statement/create";
import Field from "@/services/data/database/statement/field";

const fields: Field[] = [
    new Field("id").setType("SERIAL").setPrimary(),
    new Field("team_id").setType("SERIAL"),
    new Field("name").setType("VARCHAR(255)").setNotNull(),
    new Field("lastname").setType("VARCHAR(255)").setNotNull(),
    new Field("nationality").setType("VARCHAR(8)").setNotNull(),
    new Field("number").setType("INT").setNotNull(),
    new Field("height").setType("FLOAT").setNotNull(),
    new Field("weight").setType("FLOAT"),
    new Field("wingspan").setType("FLOAT"),
    new Field("position").setType("basketball.POSITION_ENUM").setNotNull(),
    new Field("birth_date").setType("DATE").setNotNull(),
    new Field("starter").setType("BOOLEAN").setNotNull().setDefault("FALSE"),
];

export default new Create("basketball.players").addFields(...fields).build();
