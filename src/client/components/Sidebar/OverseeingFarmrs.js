import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Collapse, Modal } from 'antd';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';
import FarmrOverseer from './FarmrOverseer';
import Loading from '../../components/Icon/Loading';
import steemAPI from '../../steemAPI';
import './InterestingPeople.less';
import './SidebarContentBlock.less';

@withRouter
class OverseeingFarmrs extends React.Component {
  static defaultProps = {
    authenticatedUser: {
      name: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      userNames: [],
      loading: true,
      noUsers: false,
    };

    this.getFarmrOverseers = this.getFarmrOverseers.bind(this);
    this.handleUserAccountClick = this.handleUserAccountClick.bind(this);
  }

  componentDidMount() {
    this.getFarmrOverseers();
  }

  getFarmrOverseers() {
    steemAPI.sendAsync('get_accounts', [["farmr"]])
      .then(users =>
        this.setState({
          users,
          loading: false,
          noUsers: false,
        })
      )
     .catch(() => {
        this.setState({
          noUsers: true,
        });
      });
  }

  handleUserAccountClick(event) {
    event.preventDefault();
    const alertText = `This feature is coming soon.`
    Modal.info({
      content: (
        <div>
          <p>
            <ReactMarkdown source={alertText} />
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const { users, loading, noUsers } = this.state;

    if (noUsers) {
      return <div />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel
          header={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <i className="iconfont icon-group SidebarContentBlock__icon" />{' '}
              <FormattedMessage id="overseeing_farmrs" defaultMessage="Overseeing Farmrs" />
              <button
                onClick={this.getFarmrOverseers}
                className="InterestingPeople__button-refresh"
              >
                <i
                  className="iconfont icon-refresh"
                  style={{
                    marginRight: 15,
                  }}
                />
              </button>
            </div>
          }
          key="1"
        >
          <div
            className="SidebarContentBlock__content"
            style={{ textAlign: 'center', overflowY: 'auto', height: 'auto', paddingLeft: 0 }}
          >
            {users && users.map(user => <FarmrOverseer key={user.name} user={user} />)}
            <Button
              type="primary"
              href="https://discord.gg/wWrnSXK"
              target="_blank">
              Join The Community
            </Button>
          </div>
        </Collapse.Panel>
      </Collapse>
    );
  }
}

export default OverseeingFarmrs;
