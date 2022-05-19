import { extendTheme } from "@chakra-ui/react"

const colors = {
  primary: {
    white: "#FFFFFF",
    100: "#F7F9Fc",
    200: "#EDF0F7",
    300: "#E2E7F0",
    400: "#CBD2E0",
    500: "#A0ABC0",
    600: "#717D96",
    700: "#4A5468",
    800: "#2D3648",
    900: "#1A202C"
  },
  accents: {
    yellow: "#FFD43A",
    orange: "#FE9D35",
    green: "#2EDB4B",
    blue: "#34AFF7",
    purple: "#F134F7",
    red: "#FF5252",
    lightYellow: "#FFEDAD",
    lightOrange: "#FED7AD",
    lightGreen: "#D1FFD9",
    lightBlue: "#B0DCFF",
    lightPurple: "#F6D1FF",
    lightRed: "#FFB8B8",
  }
}

const customTheme = extendTheme({ colors })

export default customTheme