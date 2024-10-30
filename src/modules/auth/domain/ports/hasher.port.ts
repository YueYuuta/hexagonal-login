// domain/ports/hasher.interface.ts
export interface Hasher {
  compare(password: string, hash: string): Promise<boolean>;
}
