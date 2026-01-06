import { getCurrentUserWithSession } from "../../helpers/userContext";
import UserDropdown from "./UserDropdown";

export default async function UserDropdownWrapper() {
  const user = await getCurrentUserWithSession();
  return <UserDropdown user={user} />;
}
