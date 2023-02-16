/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OWM_APPID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
