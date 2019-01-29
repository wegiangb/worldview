import util from '../../util/util';
import { OPEN_BASIC, OPEN_CUSTOM, TOGGLE, RENDER_TEMPLATE } from './constants';
import { actionOrienter, requestAction } from '../core/actions';

export function openBasicContent(modalHeader, bodyText) {
  return {
    type: OPEN_BASIC,
    headerText: modalHeader,
    bodyText: bodyText,
    key: util.encodeId('__BASIC_MODAL__' + modalHeader)
  };
}
export function openCustomContent(key) {
  return {
    type: OPEN_CUSTOM,
    key: key
  };
}
export function renderTemplate(headerText, template) {
  return {
    type: RENDER_TEMPLATE,
    key: template,
    template: template,
    headerText: headerText
  };
}
export function requestLoadedPage(pageName, location, type) {
  return dispatch => {
    return requestAction(dispatch, pageName, location);
  };
}
export function onToggle() {
  return {
    type: TOGGLE
  };
}
