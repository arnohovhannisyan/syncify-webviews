import { IModalContent } from "./modalContent";

export interface IModalControls {
  show: () => void;
  hide: () => void;
  setContent: (content: IModalContent) => void;
}
