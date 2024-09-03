import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  // Generate a salt with 10 rounds
  // this is the number of rounds the algorithm will run to hash the password more rounds means more secure but also slower
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  return bcrypt.hashSync(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  // Compare the password with the hashed password
  return bcrypt.compare(password, hashedPassword);
}
