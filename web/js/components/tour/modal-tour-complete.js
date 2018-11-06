import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalComplete extends React.Component {
  render() {
    let readMoreLinks = this.props.currentStory.readMoreLinks;
    let list;
    if (readMoreLinks) {
      list = (
        <React.Fragment>
          <p>Read more about this story at the links below:</p>
          <ul>
            {readMoreLinks.map((linkId, i) =>
              <li key={i} index={i}><a href={linkId.link}>{linkId.title}</a></li>
            )}
          </ul>
        </React.Fragment>
      );
    }
    return (
      <div>
        <Modal isOpen={this.props.modalComplete} toggle={this.props.toggleModalComplete} wrapClassName='tour tour-complete' className={this.props.className} backdrop={true}>
          <ModalHeader toggle={this.props.toggleModalComplete} charCode="">Story Complete</ModalHeader>
          <ModalBody>
            <p>You have now completed a story in Worldview. To view more stories, click the "More Stories" button below or, <a href="#">explore more events</a> within the app. Click the "Exit Tutorial" button or close this window to start using Worldview on your own.</p>
            {list}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-primary" onClick={this.props.startTour}>More Stories</button>
            <button type="button" className="btn btn-secondary" onClick={this.props.toggleModalComplete}>Exit Tutorial</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalComplete.propTypes = {
  modalComplete: PropTypes.bool.isRequired,
  currentStory: PropTypes.object.isRequired,
  toggleModalComplete: PropTypes.func.isRequired,
  startTour: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default ModalComplete;
