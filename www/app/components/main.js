var React = require('react');
var mixins = require('baobab-react/mixins');
var Nav = require('./nav');
var Errors = require('./errors');

module.exports = React.createClass({
  displayName: 'Main',
  mixins: [
    mixins.root
  ],

  showFAQ: function() {
    //TODO
  },

  render: function() {
    return (
      <div>
        <Nav />

        <Errors />

        <div className="container main">
          <div className="row">
            <div className="col-sm-12 text-center disclaimer">
              <a onClick={this.showFAQ} className="clickable" translate>
                This is an unofficial app viewer for Ubuntu Touch apps.
              </a>
            </div>
          </div>

          {this.props.children}

          <div className="row text-center footer">
            <div className="col-sm-4">
              <a href="https://uappexplorer.com/app/uappexplorer.bhdouglass">
                <i className="fa fa-fw fa-mobile"></i> <span>Web App</span>
              </a>

              <a href="https://uappexplorer.com/app/uappexplorer-scope.bhdouglass">
                <i className="fa fa-fw fa-mobile"></i> <span>Scope</span>
              </a>

              <a href="https://uappexplorer.com/app/uappexplorer-donate.bhdouglass" className="hidden-xs">
                <i className="fa fa-fw fa-mobile"></i> <span>Donation Web App</span>
              </a>
            </div>

            <div className="col-sm-4">
              <a href="https://twitter.com/uappexplorer" style={{display: 'inline-block !important'}}><i className="fa fa-fw fa-t"></i> Twitter</a>
              <a href="https://plus.google.com/+Uappexplorer-ubuntu" style={{display: 'inline-block !important'}}><i className="fa fa-fw fa-gp"></i> Google+</a>
            </div>
            <div className="col-sm-4">
              <a href="http://feeds.feedburner.com/UbuntuTouchNewApps">
                <i className="fa fa-fw fa-rss-square"></i> <span>New Apps</span>
              </a>
              <a href="http://feeds.feedburner.com/uAppExplorerUpdatedApps">
                <i className="fa fa-fw fa-rss-square"></i> <span>Updated Apps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
