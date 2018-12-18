import React from 'react';
import ReactDOM from 'react-dom';
import Tour from '../components/tour/tour';
import util from '../util/util';

export function tourUi(models, ui, config) {
  var self = {};
  self.resetting = false;
  self.events = util.events();

  var init = function() {
    if (!config.features.tour || !config.stories || !config.storyOrder) {
      return;
    }

    self.reactComponent = ReactDOM.render(
      React.createElement(Tour, getInitialProps()),
      document.getElementById('wv-tour')
    );

    models.wv.events.on('startup', function() {
      let story = models.tour.selected;
      let storyLoaded = false;
      if (story && storyLoaded === false) {
        self.selectTour(null, story, 1, story.id);
        storyLoaded = true;
      }
    });
  };

  var getInitialProps = function() {
    return {
      models: models,
      config: config,
      ui: ui,
      stories: config['stories'],
      storyOrder: config['storyOrder'],
      modalStart: self.checkBuildTimestamp(),
      modalInProgress: false,
      modalComplete: false,
      currentStep: 1,
      totalSteps: 10,
      tourParameter: config.parameters.tr || null,
      currentStoryIndex: 0,
      currentStory: {},
      currentStoryId: '',
      startTour: self.startTour,
      resetTour: self.resetTour,
      restartTour: false,
      metaLoaded: false,
      selectTour: self.selectTour,
      showTourAlert: ui.alert.showTourAlert,
      hideTour: self.hideTour,
      showTour: self.showTour
    };
  };

  var initTourState = function() {
    var leading;
    var map = ui.map.selected;

    self.resetting = true;
    if (models.compare && models.compare.active) {
      models.compare.toggle();
    }
    models.proj.selectDefault();
    models.layers.reset(models.layers.activeLayers);
    models.date.select(util.today());

    leading = models.map.getLeadingExtent();
    map.getView().fit(leading, map.getSize());
    self.resetting = false;
    self.events.trigger('reset');
    setTourState();
  };

  var setTourState = function() {
    models.proj.selectDefault();
    ui.sidebar.expandNow();
    ui.sidebar.selectTab('layers');
    ui.timeline.expandNow();
  };

  self.checkBuildTimestamp = function() {
    var hideTour = localStorage.getItem('hideTour');

    if (!util.browser.localStorage) return;

    // Don't start tour if coming in via a permalink
    if (window.location.search && !config.parameters.tour) {
      return false;
    }

    if (hideTour && config.buildDate) {
      let buildDate = new Date(config.buildDate);
      let tourDate = new Date(hideTour);
      if (buildDate > tourDate) {
        localStorage.removeItem('hideTour');
        return true;
      } else {
        return false;
      }
    } else if (hideTour) {
      return false;
    } else {
      return true;
    }
  };

  self.resetTour = function(e) {
    if (e) e.preventDefault();
    initTourState();
    self.startTour();
  };

  self.startTour = function(e) {
    if (e) e.preventDefault();
    self.reactComponent.setState({
      modalStart: true,
      modalInProgress: false,
      modalComplete: false,
      restartTour: true
    });
  };

  self.selectTour = function(e, currentStory, currentStoryIndex, currentStoryId) {
    let totalSteps = currentStory.steps;
    if (e) e.preventDefault();
    self.reactComponent.setState({
      models: models,
      config: config,
      ui: ui,
      currentStep: 1,
      totalSteps: totalSteps.length,
      currentStoryIndex: currentStoryIndex,
      modalStart: false,
      modalInProgress: true,
      metaLoaded: false,
      modalComplete: false,
      currentStory: currentStory,
      currentStoryId: currentStoryId
    });
  };

  self.hideTour = function(e) {
    var hideTour = localStorage.getItem('hideTour');

    if (!util.browser.localStorage) return;
    if (hideTour) return;

    localStorage.setItem('hideTour', new Date());
  };

  self.showTour = function(e) {
    var hideTour = localStorage.getItem('hideTour');

    if (!util.browser.localStorage) return;
    if (!hideTour) return;

    localStorage.removeItem('hideTour');
  };

  init();
  return self;
}
