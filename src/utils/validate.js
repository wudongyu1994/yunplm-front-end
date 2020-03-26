/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isPhone(test) {
  return /^(((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\s*\d{4}\s*\d{4})$/.test(test)
}

export function isNo(test) {
  return /^[A-Za-z0-9]+$/.test(test)
}

export function isEmail(test) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(test)
}
