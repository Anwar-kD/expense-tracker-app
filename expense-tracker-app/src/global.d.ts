// global.d.ts
export {};

declare global {
  interface Window {
    Cypress?: boolean;
  }
}
