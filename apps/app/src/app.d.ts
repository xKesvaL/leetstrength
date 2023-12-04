/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/svelte" />
/// <reference types="vite-plugin-pwa/client" />

import type { LocalStorageKey, SearchParameter } from "$lib/CONFIG";

import "@total-typescript/ts-reset";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }

  interface URLSearchParams {
    get(name: SearchParameter): null | string;
  }

  interface Storage {
    getItem(key: LocalStorageKey): null | string;
    setItem(key: LocalStorageKey, value: string): void;
  }
}

export {};
