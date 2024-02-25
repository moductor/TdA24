import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function InputList({ children }: Props) {
  return <div style={{ display: "grid", gap: "1rem" }}>{children}</div>;
}
