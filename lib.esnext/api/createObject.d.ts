/**
 * Create an object in sequence of code.
 * @param {String} cls - class name of crypto object.
 * @returns {Object} .
 */
export declare function CreateObject(cls: string): object;
/**
 * Create an object in async mode.
 * @param {String} cls - name of crypto object.
 * @returns {Promise} .
 */
export declare const CreateObjectAsync: any;
/**
 * Create a crypto object which we can create in current browser.
 * {@see window.cadesplugin.CreateObjectAsync CreateObjectAsync}.
 * @param {'CAdESCOM.Store'|'CAdESCOM.CPSigner'|'CAdESCOM.CadesSignedData'|String} cls
 *        - name of class for to create an object.
 * @returns {Object|undefined} .
 */
export declare const createObject: any;
