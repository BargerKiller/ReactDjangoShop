import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ColorTShortEnum,
    PropertiesColorType,
    PropertiesSizeType,
    PropertiesSliceState,
    SizeTShortEnum,
} from "@/redux/productProperties/type";

import {
  getPropertiesLS,
  setPropertiesLS,
} from "@/redux/productProperties/service";

import { hasSizeColor } from "@/utils/hasColor";

const initialState: PropertiesSliceState = {
  ...getPropertiesLS(),
};

const productPropertiesSlice = createSlice({
  name: "productProperties",
  initialState,
  reducers: {
    setActiveColor(state, action: PayloadAction<PropertiesColorType>) {
      const propElement = hasSizeColor(
        state.propertiesList,
        action.payload.productId
      );
      if (propElement) propElement.color = action.payload.color;
      else {
        state.propertiesList.push({
          id: action.payload.productId,
          color: action.payload.color,
          size: SizeTShortEnum.S,
        });
      }
      setPropertiesLS(state.propertiesList);
    },
    setActiveSize(state, action: PayloadAction<PropertiesSizeType>) {
        const propElement = hasSizeColor(
        state.propertiesList,
        action.payload.productId
      );
      if (propElement) propElement.size = action.payload.size;
      else {
        state.propertiesList.push({
          id: action.payload.productId,
          color:ColorTShortEnum.BLACK,
          size: action.payload.size,
        });
      }
      setPropertiesLS(state.propertiesList);
    },
  },
});

export const { setActiveColor } = productPropertiesSlice.actions;
export default productPropertiesSlice.reducer;
