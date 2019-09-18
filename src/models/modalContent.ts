import { IModalButton } from "./modalButton";

export interface IModalContent {
  id: string;
  title: string;
  message: string;
  buttons: IModalButton[];
}
