const passwordHash = require("password-hash");

const passs = "123123123123";

const hash = passwordHash.generate(passs);

console.log(passwordHash.verify(passs, hash));
