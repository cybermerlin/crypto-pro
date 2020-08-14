import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';

/**
 * Create an object in sequence of code.
 * @param {String} cls - class name of crypto object.
 * @returns {Object} .
 */
export function CreateObject(cls: string): object {
  return window.cadesplugin.CreateObject(cls);
}

/**
 * Create an object in async mode.
 * @param {String} cls - name of crypto object.
 * @returns {Promise} .
 */
export const CreateObjectAsync: any = _afterPluginsLoaded((cls: string) => window.cadesplugin.CreateObjectAsync(cls));

/**
 * Create a crypto object which we can create in current browser.
 * {@see window.cadesplugin.CreateObjectAsync CreateObjectAsync}.
 * @param {'CAdESCOM.Store'|'CAdESCOM.CPSigner'|'CAdESCOM.CadesSignedData'|String} cls
 *        - name of class for to create an object.
 * @returns {Object|undefined} .
 */
export const createObject: any = _afterPluginsLoaded(async (cls: string) => {
  let result;

  try {
    result = await window.cadesplugin.CreateObjectAsync(cls);
  } catch (error) {
    console.error(error);
    throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при попытке доступа к ' + cls);
  }

  return result;
});
