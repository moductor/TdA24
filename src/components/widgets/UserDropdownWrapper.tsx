import { getCurrentUserWithSession } from "../../app/user/auth/isLoggedIn";
import UserDropdown from "./UserDropdown";

export default function UserDropdownWrapper() {
  const user = getCurrentUserWithSession();
  return <UserDropdown user={user} />;
}
