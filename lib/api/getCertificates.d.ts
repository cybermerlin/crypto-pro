import { Certificate } from './certificate';
/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов.
 * @param {(number | string)[]} [storeParams=[CAPICOM_CURRENT_USER_STORE,CAPICOM_MY_STORE,CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED]] - параметры открытия Хранилищ сертификатов.
 * @returns список сертификатов
 */
export declare const getCertificates: (resetCache?: boolean, storeParams?: (string | number)[]) => Promise<Certificate[]>;
