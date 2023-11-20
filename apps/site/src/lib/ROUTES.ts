/** 
 * This file was generated by 'vite-plugin-kit-routes'
 * 
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

export const PAGES = {
  lang_lg: (params: { lang?: string | number } = {}) => {
    return ensurePrefix(`${params?.lang ? `/${params?.lang}` : ""}`);
  },
  lang_lg_about: (params: { lang?: string | number } = {}) => {
    return ensurePrefix(`${params?.lang ? `/${params?.lang}` : ""}/about`);
  },
  lang_lg_features: (params: { lang?: string | number } = {}) => {
    return ensurePrefix(`${params?.lang ? `/${params?.lang}` : ""}/features`);
  },
  lang_lg_pricing: (params: { lang?: string | number } = {}) => {
    return ensurePrefix(`${params?.lang ? `/${params?.lang}` : ""}/pricing`);
  },
};

export const SERVERS = {
  "assets_manifest.webmanifest": () => {
    return ensurePrefix(`/manifest.webmanifest`);
  },
  "assets_sitemap.xml": (method: "GET") => {
    return ensurePrefix(`/sitemap.xml`);
  },
};

export const ACTIONS = {
  
}

const appendSp = (sp?: Record<string, string | number | undefined>) => {
  if (sp === undefined) return "";
  const mapping = Object.entries(sp)
    .filter((c) => c[1] !== undefined)
    .map((c) => [c[0], String(c[1])]);

  const formated = new URLSearchParams(mapping).toString();
  if (formated) {
    return `?${formated}`;
  }
  return "";
};

const ensurePrefix = (str: string) => {
  if (str.startsWith("/")) {
    return str;
  }
  return `/${str}`;
};

/**
 * Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
 *
 * Full example:
 * ```ts
 * import type { KIT_ROUTES } from './ROUTES'
 * import { kitRoutes } from 'vite-plugin-kit-routes'
 *
 * kitRoutes<KIT_ROUTES>({
 *  extend: {
 *    PAGES: {
 *      // here, "paths" it will be typed!
 *    }
 *  }
 * })
 * ```
 */
export type KIT_ROUTES = {
  PAGES: {
    lang_lg: "lang";
    lang_lg_about: "lang";
    lang_lg_features: "lang";
    lang_lg_pricing: "lang";
  };
  SERVERS: { "assets_manifest.webmanifest": never; "assets_sitemap.xml": never };
  ACTIONS: {};
  Storage_Params: { lang: never };
};

import { browser } from "$app/environment";
import { writable } from "svelte/store";

const _kitRoutes = <T>(key: string, initValues?: T) => {
  const store = writable<T>(initValues, (set) => {
    if (browser) {
      if (initValues) {
        const v = localStorage.getItem(key);
        if (v) {
          try {
            const json = JSON.parse(v);
            set(json);
          } catch (error) {
            set(initValues);
          }
        } else {
          set(initValues);
        }
      } else {
        set({} as any);
      }

      const handleStorage = (event: StorageEvent) => {
        if (event.key === key) set(event.newValue ? JSON.parse(event.newValue) : null);
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    } else {
      if (initValues) {
        set(initValues);
      } else {
        set({} as any);
      }
    }
  });

  return {
    subscribe: store.subscribe,
    update: (u: T) => {
      if (browser) {
        localStorage.setItem(key, JSON.stringify(u));
      }
      store.update(() => u);
    },
  };
};

export type StorageParams = { }
/**
 *
 * Example of usage:
 * ```ts
 *  import { afterNavigate } from '$app/navigation'
 *  import { kitRoutes } from './ROUTES.js'
 *
 *  afterNavigate(() => {
 *	  kitRoutes.update({ lang: $page.params.lang })
 *  })
 * ```
 *
 */
export let kitRoutes = _kitRoutes<StorageParams>("kitRoutes");
