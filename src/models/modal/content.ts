import { IModalButton } from "~/models";

export interface IModalContent {
  id: string;
  title: string;
  message: string;
  buttons: IModalButton[];
}
