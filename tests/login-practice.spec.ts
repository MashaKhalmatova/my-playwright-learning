import { test } from "@playwright/test";
import { validUser, getLoginUrl } from "../test-data";

test("test data is wired correctly", async () => {
  const { email, password } = validUser;  // destructuring!
});