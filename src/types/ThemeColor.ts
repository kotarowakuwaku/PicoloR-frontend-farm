export default interface ThemeColor {
  ColorId: number;
  ColorCode: string;
}

export interface ThemeColorsWithIsPosted extends ThemeColor {
  isPosted: boolean;
}
