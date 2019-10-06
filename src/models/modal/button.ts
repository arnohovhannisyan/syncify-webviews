export interface IModalButton {
  name: string;
  color: "primary" | "secondary";
  action: () => void;
}
