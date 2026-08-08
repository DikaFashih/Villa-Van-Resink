import bcrypt from "bcrypt";

async function main() {
  const password = "123456";
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
}

main();
