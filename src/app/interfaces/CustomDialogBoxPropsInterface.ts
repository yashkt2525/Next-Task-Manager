import { ObjectDataType } from "./ObjectDataTypeInterface";
export interface CustomDialogBoxProps {
  takeData?: (textFieldValues: ObjectDataType) => void;
  title: string;
  setIsSubmit?: (dispatch: boolean | ((prevState: boolean) => boolean)) => void;
  tasks?: ObjectDataType[];
  isEdit?: boolean;
  id?: string;
  setTasks?: (
    dispatch:
      | Array<ObjectDataType>
      | ((prevState: Array<ObjectDataType>) => Array<ObjectDataType>)
  ) => void;
  index?: number;
}
