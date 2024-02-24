import { getUserContext } from "../../helpers/userContext";
import UserDropdown from "./UserDropdown";

export default function UserDropdownWrapper() {
  const user = getUserContext();
  return <UserDropdown user={user} />;
}
