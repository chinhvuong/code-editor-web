import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      bg: {
        bg1: string;
        bg2: string;
        bg3: string;
        bg25: string;
        bg35: string;
        [key: string]: string;
      };
      text: {
        text1: string;
        text2: string;
        text3: string;
        [key: string]: string;
      };
    };
  }
}
