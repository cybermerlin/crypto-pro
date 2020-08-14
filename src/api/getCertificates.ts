import { CadesCertificate, Certificate } from './certificate';
import {
  CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
  CAPICOM_CERTIFICATE_FIND_TIME_VALID,
  CAPICOM_CURRENT_USER_STORE,
  CAPICOM_MY_STORE,
  CAPICOM_PROPID_KEY_PROV_INFO,
  CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
} from '../constants';
import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractCommonName } from '../helpers/_extractCommonName';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { createObject } from './createObject';

let certificatesCache: Certificate[];

/**
 * Возвращает список сертификатов, доступных пользователю в системе
 *
 * @param resetCache = false - позволяет сбросить кэш ранее полученных сертификатов.
 * @param {(number | string)[]} [storeParams=[CAPICOM_CURRENT_USER_STORE,CAPICOM_MY_STORE,CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED]] - параметры открытия Хранилищ сертификатов.
 * @returns список сертификатов
 */
export const getCertificates = _afterPluginsLoaded(
  (
    resetCache: boolean = false,
    storeParams: (number | string)[] = [
      CAPICOM_CURRENT_USER_STORE,
      CAPICOM_MY_STORE,
      CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
    ],
  ): Certificate[] =>
    window.cadesplugin.async_spawn(function* () {
      let cadesStore;

      try {
        cadesStore = createObject('CAdESCOM.Store');
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к хранилищу');
      }

      try {
        yield cadesStore.Open(...storeParams);
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при открытии хранилища');
      }

      let cadesCertificates;
      let cadesCertificatesCount;

      try {
        cadesCertificates = yield cadesStore.Certificates;

        if (cadesCertificates) {
          cadesCertificates = yield cadesCertificates.Find(CAPICOM_CERTIFICATE_FIND_TIME_VALID);

          /**
           * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
           * или не действительны на данный момент
           */
          cadesCertificates = yield cadesCertificates.Find(
            CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
            CAPICOM_PROPID_KEY_PROV_INFO,
          );

          cadesCertificatesCount = yield cadesCertificates.Count;
        }
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка получения списка сертификатов');
      }

      if (!cadesCertificatesCount) {
        throw new Error('Нет доступных сертификатов');
      }

      const certificateList: Certificate[] = [];

      try {
        while (cadesCertificatesCount) {
          const cadesCertificate: CadesCertificate = yield cadesCertificates.Item(cadesCertificatesCount);

          certificateList.push(
            new Certificate(
              cadesCertificate,
              _extractCommonName(yield cadesCertificate.SubjectName),
              yield cadesCertificate.IssuerName,
              yield cadesCertificate.SubjectName,
              yield cadesCertificate.Thumbprint,
              yield cadesCertificate.ValidFromDate,
              yield cadesCertificate.ValidToDate,
            ),
          );

          cadesCertificatesCount--;
        }
      } catch (error) {
        console.error(error);

        throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка обработки сертификатов');
      }

      cadesStore.Close();

      certificatesCache = certificateList;

      return certificatesCache;
    }),
);
