import * as bcrypt from 'bcryptjs';

export async function checkIsPasswordValid(
  password: string,
  passwordFromDB: string,
): Promise<boolean> {
  return await bcrypt.compare(password, passwordFromDB);
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 5);
}
