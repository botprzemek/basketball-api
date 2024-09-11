import query from "@/services/database/query";

const test = async () => {
    const tested = await query`SHOW TABLES`;
    console.log(tested);
}

test();