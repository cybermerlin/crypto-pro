export interface SystemInfo {
    cadesVersion: string;
    cspVersion: string;
}
/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP и плагине
 */
export declare const getSystemInfo: (aboutCSP_CryptoPro?: boolean) => SystemInfo;
