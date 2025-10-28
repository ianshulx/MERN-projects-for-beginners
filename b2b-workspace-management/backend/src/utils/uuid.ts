import { v4 as uuidv4 } from "uuid";

export function generateInviteCode() {
  return uuidv4().replace(/-/g, "").substring(0, 8);
}

export function generateTaskCode() {
  return `task-${uuidv4().replace(/-/g, "").substring(0, 3)}`;
}
