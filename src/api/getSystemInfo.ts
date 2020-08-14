import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { createObject } from './createObject';

export interface SystemInfo {
  cadesVersion: string;
  cspVersion: string;
}

/**
 * Предоставляет информацию о системе
 *
 * @returns информацию о CSP и плагине
 */
export const getSystemInfo = (aboutCSP_CryptoPro: boolean = true): SystemInfo => {
  const sysInfo = {
    cadesVersion: null,
    cspVersion: null,
  };

  return window.cadesplugin.async_spawn(function* () {
    let cadesAbout;

    try {
      cadesAbout = yield createObject('CAdESCOM.About');

      sysInfo.cadesVersion = yield cadesAbout.PluginVersion;
      if (aboutCSP_CryptoPro) {
        const PROVIDER_NAME = 'Crypto-Pro GOST R 34.10-2001 Cryptographic Service Provider';
        // 'Crypto-Pro GOST R 34.10-2012 Cryptographic Service Provider'; // new version
        // 'Crypto-Pro GOST 34.10-2018 Cryptographic Service Provider'; // national latest standart version
        const PROVIDER_TYPE = 75;
        sysInfo.cspVersion = yield cadesAbout.CSPVersion(PROVIDER_NAME, PROVIDER_TYPE);
      } else {
        sysInfo.cspVersion = yield cadesAbout.CSPVersion();
      }

      if (!sysInfo.cadesVersion) {
        sysInfo.cadesVersion = yield cadesAbout.Version;
      }

      sysInfo.cadesVersion = yield sysInfo.cadesVersion.toString();
      sysInfo.cspVersion = yield sysInfo.cspVersion.toString();
    } catch (error) {
      console.error(error);

      throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при получении информации о системе');
    }

    return sysInfo;
  });
};
