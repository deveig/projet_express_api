import { SCHEMA_FIELD_TYPE } from "redis";
import getClient from "../connection.js";
const client = await getClient();

/**
 * Validate input data and verify it against no injection
 * @param { String } value
 * @return { Boolean }
 */
export const passwordValidator = function (value) {
  if (
    value.length >= 8 &&
    /\d+/.test(value) &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[_:@!]/.test(value)
  ) {
    if (/[='<>\/]/.test(value)) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

/**
 * Verify input data against no injection
 * @param { String } value
 * @return { Boolean }
 */
export const noInjection = function (value) {
  if (/[='<>\/]/.test(value)) {
    return false;
  } else {
    return true;
  }
};

export async function getUserClient() {
  const list = await client.ft._list()
  if (list.includes("idx:users")) {
    console.log("Index idx:users already exists");
  } else {
    await client.ft.create(
      "idx:users",
      {
        "$.email": {
          type: SCHEMA_FIELD_TYPE.TEXT,
          AS: "email",
        },
        "$.password": {
          type: SCHEMA_FIELD_TYPE.TEXT,
          AS: "password",
        },
      },
      {
        ON: "JSON",
        PREFIX: "user:",
      },
    );
    
  }
  return client;
}

// export function validateUser(user) {
//   if(passwordValidator(user.password) && noInjection(user.password)) {
//     return true;
//   } else {
//     return false;
//   }
// }
