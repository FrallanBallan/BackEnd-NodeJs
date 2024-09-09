import bcrypt from "bcrypt";

// mock data
export async function POST(req, options) {
  const password1 = "password";
  const password2 = "Password"; // different case

  // hash password
  const hashedpassword1 = await bcrypt.hash(password1, 10);
  const hashedpassword2 = await bcrypt.hash(password2, 10);

  // compare passwords
  const match = await bcrypt.compare(password1, hashedpassword1);
  const mismatch = await bcrypt.compare(password2, hashedpassword1);

  return NextResponse.json({
    match: {
      input: password1,
      hashed: hashedpassword1,
      match,
    },
    mismatch: {
      input: password2,
      hashed: hashedpassword1,
      match: mismatch,
      reason:
        "Even though the passwords are the same, the case is different. bcrypt.compare is case-sensitive.",
    },
  });
}

export async function POST(req, options) {
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
  };

  const hashedUser = {
    id: user.id,
    firstName: await bcrypt.hash(user.firstName, 10),
    lastName: await bcrypt.hash(user.lastName, 10),
    phone: await bcrypt.hash(user.phone, 10),
  };

  return NextResponse.json({ user, hashedUser });
}
