var React = require('react');
var Router = require('react-router');
var mixins = require('baobab-react/mixins');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var i18n = require('i18next-client');

var actions = require('../../actions');
var QR = require('../modals/qr');

module.exports = React.createClass({
  displayName: 'Share',
  mixins: [
    mixins.branch,
    PureRenderMixin,
    Router.History,
  ],
  props: {
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    caxtonUrl: React.PropTypes.string,
  },
  cursors: {
    auth: ['auth'],
    lng: ['lng'],
  },

  getInitialState: function() {
    return {
      caxton_sent: false,
      qr: false,
    };
  },

  componentWillUpdate: function(nextProps) {
    if (this.props.caxtonUrl != nextProps.caxtonUrl) {
      this.setState({caxton_sent: false});
    }
  },

  open: function() {
    this.setState({qr: true});
  },

  close: function() {
    this.setState({qr: false});
  },

  caxton: function() {
    if (this.state.auth.loggedin) {
      if (this.state.auth.has_caxton) {
        var url = this.props.caxtonUrl ? this.props.caxtonUrl : this.props.url;

        var self = this;
        actions.sendCaxton(url, this.props.title).then(function(sent) {
          if (sent) {
            self.setState({caxton_sent: true});
          }
        });
      }
      else {
        actions.createAlert(i18n.t('You do not have your account connected to Caxton, click to go to your settings'), 'info', function() {
          this.history.pushState(null, '/me');
        });
      }
    }
    else {
      actions.createAlert(i18n.t('Please login to send via Caxton'), 'info', function() {
        actions.openModal('login');
      });
    }
  },

  render: function() {
    var style = {display: 'block !important'};
    var gp = 'https://plus.google.com/share?url=' + this.props.url;
    var fb = 'http://www.facebook.com/sharer/sharer.php?u=' + this.props.url;
    var tw = 'https://twitter.com/intent/tweet?text=' + this.props.title + '&url=' + this.props.url + '&via=uappexplorer';
    var rd = 'https://www.reddit.com/submit?url=' + this.props.url;

    var caxton = <img src="/img/caxton.svg" title={i18n.t('Send via Caxton')} />;
    if (this.state.caxton_sent) {
      caxton = <i className="fa fa-check fa-2x fa-inverse" title={i18n.t('Sent via Caxton')}></i>;
    }

    //The display block is to override the styles set by an adblocker. Some people actually want to be able to use an adblocker and still share to social media
    return (
      <div className="list-group-item-text external-links row">
        <div className="col-sm-2 col-xs-4">
          <a href={gp} className="text-material-red" title={i18n.t('Share on Google+')} style={style}>
            <i className="fa fa-gps fa-3x"></i>
          </a>
        </div>
        <div className="col-sm-2 col-xs-4">
          <a href={fb} className="text-material-blue" title={i18n.t('Share on Facebook')} style={style}>
            <i className="fa fa-fs fa-3x"></i>
          </a>
        </div>
        <div className="col-sm-2 col-xs-4">
          <a href={tw} className="text-material-light-blue" title={i18n.t('Share on Twitter')} style={style}>
            <i className="fa fa-ts fa-3x"></i>
          </a>
        </div>
        <div className="clear-fix visible-xs"></div>
        <div className="col-sm-2 col-xs-4">
          <a href={rd} className="text-material-cyan" title={i18n.t('Share on Reddit')} style={style}>
            <i className="fa fa-rs fa-3x"></i>
          </a>
        </div>
        <div className="col-sm-2 col-xs-4">
          <a className="text-material-grey caxton-button clickable" title={i18n.t('Send via Caxton')} onClick={this.caxton}>
            <i className="fa fa-square fa-3x"></i>
            {caxton}
          </a>
        </div>
        <div className="col-sm-2 col-xs-4">
          <a className="text-material-light-green qr-button clickable" title={i18n.t('QR Code')} onClick={this.open}>
            <i className="fa fa-square fa-3x"></i>
            <i className="fa fa-qrcode fa-2x fa-inverse"></i>
          </a>
        </div>

        <QR show={this.state.qr} onHide={this.close} value={this.props.url} title={this.props.title} />
      </div>
    );
  }
});
