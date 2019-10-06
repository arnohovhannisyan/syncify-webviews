import { IModalContent } from "~/models";

export interface IModalControls {
  show: () => void;
  hide: () => void;
  setContent: (content: IModalContent) => void;
}
