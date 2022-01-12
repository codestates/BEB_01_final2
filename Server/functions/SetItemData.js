import { name, grade, src } from "../Datadummy/ItemData.js";
import { ItemDB } from "../models.js";

export const setItemData = async () => {
  let ch = await ItemDB.find({ reload: false });
  if (ch.length === 0) {
    for (let i = 0; i < 19; i++) {
      const SetItem = await new ItemDB({
        reload: false,
        id: i + 1,
        name: name[i],
        grade: grade[i],
        src: src[i],
      });
      SetItem.save();
    }
    console.log("item데이터 생성!");
  }
};
