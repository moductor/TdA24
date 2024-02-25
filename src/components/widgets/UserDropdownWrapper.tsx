import { getCurrentUserWithSession } from "../../helpers/userContext";
import UserDropdown from "./UserDropdown";

export default function UserDropdownWrapper() {
  const user = getCurrentUserWithSession();
  return <UserDropdown user={user} />;
}
