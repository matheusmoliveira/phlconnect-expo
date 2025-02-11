/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#151718'
const tintColorDark = '#151718'

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#D8D8D8',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight
  },
  dark: {
    /* text: '#ECEDEE', */
    text: '#11181C',
    /* background: '#151718', */
    background: '#CCCCCC',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark
  }
}
