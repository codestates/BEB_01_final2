import { owner, MapName, idx, topography, src, giveToken } from "./MapData.js";
import { MapDB } from "./models.js";

export const SetMapData = async () => {
  let ch = await MapDB.find({ reload: false });
  if (ch.length === 0) {
    for (let i = 0; i < 15; i++) {
      const SetData = await new MapDB({
        reload: false,
        idx: idx[i],
        owner: owner[i],
        MapName: MapName[i],
        topography: topography[i],
        GiveToken: giveToken[i],
        src: src[i],
      });
      SetData.save();
    }
    console.log("MapData 초기화 완료!");
  } else {
    console.log("MapData 존재함!");
  }
};
