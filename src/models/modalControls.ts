import { IContent } from "../components";

export interface IModalControls {
  show: () => void;
  hide: () => void;
  setContent: (content: IContent) => void;
}
