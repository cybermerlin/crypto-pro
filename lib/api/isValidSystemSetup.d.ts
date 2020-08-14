import { SystemInfo } from './getSystemInfo';
/**
 * Проверяет корректность настроек ЭП на машине
 *
 * @returns флаг корректности настроек
 */
export declare const isValidSystemSetup: () => Promise<Generator<SystemInfo, boolean, SystemInfo>>;
