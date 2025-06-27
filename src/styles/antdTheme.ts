import { ThemeConfig } from "antd";
import { constant } from "./constants";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: constant.primaryColor,
    colorSuccess: constant.successLightColor,
    colorError: constant.errorLightColor,
    colorWarning: constant.warning,
    colorBgContainer: constant.background,
    borderRadius: constant.boxRadius,
    fontFamily: constant.textInputStyle.fontFamily,
    fontSize: constant.textInputStyle.fontSize,
    colorTextPlaceholder: constant.placeholderColor,
    colorText: constant.primaryColor,

    colorTextSecondary: constant.placeholderColor,
  },
  components: {
    Button: {
      colorPrimary: constant.primaryColor,
      colorPrimaryHover: constant.secondaryColor,
      colorPrimaryActive: constant.secondaryLightColor,
      borderRadius: constant.boxRadius,
    },
    Input: {
      colorBgContainer: constant.white,
      colorTextPlaceholder: constant.placeholderColor,
      colorBorder: constant.primaryColor,
      fontSize: constant.textInputStyle.fontSize,
    },
    Radio: {
      colorPrimary: constant.primaryColor,
      colorBgContainer: constant.white,
      radioSize: 18,
      dotSize: 8,
      colorBorder: constant.borderColor,
    },
    Checkbox: {
      colorBorder: constant.borderColor,
      colorPrimary: constant.primaryColor,

      controlInteractiveSize: 20,
      lineWidth: 2,
      borderRadiusSM: 2,
    },
    Form: {
      labelColor: constant.primaryColor,
    },
  },
};
