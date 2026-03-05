import { SCHEMA_FIELD_TYPE } from "redis";
import getCLient from "../connection.js";
const client = await getCLient();

/**
 * Validate input data and verify it against no injection
 * @param { String } value
 * @return { Boolean }
 */
const inputValidator = function (value) {
  if (/\d+/.test(value)) {
    return false;
  } else {
    if (/[='<>\/]/.test(value)) {
      return false;
    } else {
        return true;
    }
  }
};

export async function getSauceClient() {
    const list = await client.ft._list();
    if(list.includes("idx:sauces")){
        console.log("Index idx:sauces already exists");
    } else {
        await client.ft.create(
        "idx:sauces",
        {
            "$.id": {
                type: SCHEMA_FIELD_TYPE.TEXT,
                AS: "id"
            },
            "$.name": {
            type: SCHEMA_FIELD_TYPE.TEXT,
            AS: "name",
            },
            "$.manufacturer": {
            type: SCHEMA_FIELD_TYPE.TEXT,
            AS: "manufacturer",
            },
            "$.description": {
            type: SCHEMA_FIELD_TYPE.TEXT,
            AS: "description",
            },
            "$.mainPepper": {
            type: SCHEMA_FIELD_TYPE.TEXT,
            AS: "mainPepper",
            },
            "$.imageUrl": {
            type: SCHEMA_FIELD_TYPE.TEXT,
            AS: "imageUrl",
            },
            "$.heat": {
            type: SCHEMA_FIELD_TYPE.NUMERIC,
            AS: "heat",
            },
            "$.likes": {
            type: SCHEMA_FIELD_TYPE.NUMERIC,
            AS: "likes",
            },
            "$.dislikes": {
            type: SCHEMA_FIELD_TYPE.NUMERIC,
            AS: "dislikes",
            },
            "$.usersLiked": {
            type: SCHEMA_FIELD_TYPE.TAG,
            AS: "usersLiked",
            },
            "$.usersDisliked": {
            type: SCHEMA_FIELD_TYPE.TAG,
            AS: "usersDisliked",
            },
        },
        {
            ON: "JSON",
            PREFIX: "sauce:",
        },
        );
        
    } 
    return client;
}
export function validateSauce(sauce) {
    if(inputValidator(sauce.name) && inputValidator(sauce.manufacturer) && inputValidator(sauce.description) && inputValidator(sauce.mainPepper)) {
        return true;
    } else {
        return false;
    }
}