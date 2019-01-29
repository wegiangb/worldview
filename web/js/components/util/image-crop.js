import React from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-image-crop';
import { Portal } from 'react-portal';

// https://stackoverflow.com/a/13139830
const TRANSPARENT_GIF =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
/*
 * A react reuseable list component
 *
 * @class List
 * @extends React.Component
 */

export default class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height
      }
    };
  }
  renderCoords() {
    const { coordinates, topRightStyle, bottomLeftStyle } = this.props;
    if (bottomLeftStyle.width < 50) {
      return '';
    }
    return (
      <React.Fragment>
        <div
          id="wv-image-top"
          className="wv-image-coords wv-image-top"
          style={topRightStyle}
        >
          {coordinates.topRight}
        </div>
        <div
          id="wv-image-bottom"
          className="wv-image-coords wv-image-bottom"
          style={bottomLeftStyle}
        >
          {coordinates.bottomLeft}
        </div>
      </React.Fragment>
    );
  }
  render() {
    const {
      onClose,
      onChange,
      maxWidth,
      maxHeight,
      showCoordinates
    } = this.props;
    const { crop } = this.state;
    return (
      <Portal node={document && document.getElementById('wv-content')}>
        {showCoordinates ? this.renderCoords() : ''}
        <Cropper
          crop={crop}
          src={TRANSPARENT_GIF}
          style={{
            background:
              crop.width && crop.height ? 'none' : 'rgba(0, 0, 0, 0.5)',
            zIndex: 10
          }}
          imageStyle={{
            width: maxWidth,
            height: maxHeight
          }}
          onComplete={crop => {
            if (!crop.width || !crop.height) {
              onClose();
            }
          }}
          onChange={crop => {
            this.setState({ crop });
            onChange(crop);
          }}
        />
      </Portal>
    );
  }
}
Crop.defaultProps = {
  x: 20,
  y: 10,
  width: 30,
  height: 10,
  maxHeight: window.innerWidth,
  maxWidth: window.innerHeight
};
Crop.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
