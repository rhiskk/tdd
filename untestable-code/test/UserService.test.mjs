import { UserService, PostgresUserDao } from "../src/UserService.mjs";
import { expect } from "chai";

describe("User service", () => {
  let userService;
  beforeEach(async () => {
    await PostgresUserDao.getInstance().open();
    await PostgresUserDao.getInstance().createTables();
    userService = new UserService();
    await userService.addNewUser(1, "old");
  });

  afterEach(async () => {
    await PostgresUserDao.getInstance().dropTables();
  });

  after(async () => {
    await PostgresUserDao.getInstance().close();
  });

  it("does not change the password when an invalid old password is given", async () => {
    let error = null;
    try {
      await userService.changePassword(1, "wrong", "new");
    } catch (e) {
      error = e.message;
    }
    expect(error).to.equal("wrong old password");
  });

  it("changes the password when a valid old password is given", async () => {
    const newPassword = "new";
    await userService.changePassword(1, "old", newPassword);
    const verified = await userService.verifyPassword(1, newPassword);
    expect(verified).to.be.true;
  });
});
