declare module 'wow.js' {
    export default class WOW {
      static WOW: any;
      constructor(options?: WOW.WOWOptions);
      init(): void;
    }
  
    namespace WOW {
      interface WOWOptions {
        boxClass?: string;
        animateClass?: string;
        offset?: number;
        mobile?: boolean;
        live?: boolean;
        callback?: (box: HTMLElement) => void;
        scrollContainer?: HTMLElement | null;
      }
    }
  }
  