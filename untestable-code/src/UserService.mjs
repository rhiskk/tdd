import argon2 from "@node-rs/argon2";
import pg from "pg";


export class PostgresUserDao {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  close() {
    this.db.end();
  }

  open() {
    this.db.connect();
  }

  createTables() {
    return this.db.query(`create table if not exists users (
      user_id integer primary key,
      password_hash varchar(100) not null
    )`);
  }

  dropTables() {
    return this.db.query(`drop table if exists users`);
  }

  rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.rowToUser)[0] || null;
  }

  async save(user) {
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class UserService {
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    if (!await this.verifyPassword(userId, oldPassword)) {
      throw new Error("wrong old password");
    }
    const user = {
      userId,
      passwordHash: argon2.hashSync(newPassword),
    };
    await this.users.save(user);
    return user;
  }

  async addNewUser(userId, password) {
    const user = await this.users.getById(userId);
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = {
      userId,
      passwordHash: argon2.hashSync(password),
    };
    await this.users.save(newUser);
    return newUser;
  }

  async verifyPassword(userId, password) {
    const user = await this.users.getById(userId);
    return argon2.verifySync(user.passwordHash, password);
  }
}
