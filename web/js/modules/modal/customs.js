import ImageDownload from '../../containers/image-download';
import Projection from '../../containers/projection';
import InfoList from '../../containers/info';
import ShareLinks from '../../containers/share';

export const customProps = {
  TOOLBAR_PROJECTION: {
    headerText: null,
    type: 'toolbar',
    modalClassName: 'toolbar-list-modal toolbar-modal',
    backdrop: false,
    bodyComponent: Projection,
    offsetRight: '40px'
  },
  TOOLBAR_SHARE_LINK: {
    headerText: 'Copy link to share:',
    type: 'toolbar',
    backdrop: false,
    offsetRight: '198px',
    modalClassName: 'toolbar-share-modal toolbar-modal toolbar-medium-modal',
    bodyComponent: ShareLinks
  },
  TOOLBAR_INFO: {
    headerText: null,
    backdrop: false,
    type: 'toolbar',
    modalClassName: 'toolbar-list-modal toolbar-modal',
    offsetRight: '10px',
    bodyComponent: InfoList
  },
  TOOLBAR_SNAPSHOT: {
    headerText: 'Take a Snapshot',
    backdrop: false,
    wrapClassName: 'clickable-behind-modal',
    type: 'selection',
    offsetRight: '70px',
    modalClassName: 'toolbar-snapshot-modal toolbar-modal toolbar-medium-modal',
    bodyComponent: ImageDownload
  }
};
