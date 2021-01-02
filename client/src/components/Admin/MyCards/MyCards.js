import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

import Header from '../Header.js';
import MyCard from './MyCard.js';
import Footer from '../../Footer.js';
import './styles.css';

import defaultImg from '../../../images/digitalia.PNG';

const server = 'http://localhost:5000';

class MyCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      userImg: 'none',
      links: [],
    };
  }

  onDragStart = (result) => {
    this.setState({ status: '' });
    const { source } = result;
  };

  onDragEnd = (result) => {
    this.setState({ status: '' });
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const updatedLinks = [...this.state.links];
    updatedLinks.splice(source.index, 1);
    updatedLinks.splice(destination.index, 0, this.state.links[source.index]);

    this.setState({ links: updatedLinks });
  };

  addLink = () => {
    this.setState({ status: '' });
    const links = this.state.links;

    if (links === []) {
      const newLinks = links.push({
        name: 'Link Name',
        url: 'Link URL',
        enabled: true,
      });
      this.setState({ links: newLinks });
    } else if (
      !links.some((link) => link.name === '') &&
      !links.some((link) => link.url === '' || !validateURL(link.url))
    ) {
      const newLinks = [
        ...links,
        { name: 'Link Name', url: 'Link URL', enabled: true },
      ];
      this.setState({ links: newLinks });
    } else {
      this.setState({ status: 'Fill Everything First' });
    }
  };

  updateLink = (event) => {
    this.setState({ status: '' });
    const target = event.target;
    const fields = target.name.split('_');
    const num = fields[1];
    const name = fields[0];

    const links = this.state.links;
    const link = links[num];

    let updateValue = target.value;
    if (name === 'url') {
      updateValue = protocolURL(target.value);
    }

    link[name] = updateValue;
    links.splice(num, 1, link);

    this.setState({ links: links });
  };

  switchEnable = (event) => {
    this.setState({ status: '' });
    const target = event.target;

    const links = this.state.links;
    const link = links[target.id.charAt(target.id.length - 1)];
    link.enabled = !link.enabled;
    links.splice(target.id.charAt(target.id.length - 1), 1, link);

    this.setState({ links: links });
  };

  deleteLink = (event) => {
    this.setState({ status: '' });
    const target = event.target;

    const links = this.state.links;
    links.splice(target.id.charAt(target.id.length - 1), 1);

    this.setState({ links: links });

    console.log(this.state.links);
  };

  saveLinks = () => {
    this.setState({ status: 'Saving' });
    const links = this.state.links;
    if (
      !links.some((link) => link.name === '') &&
      !links.some((link) => link.url === '' || !validateURL(link.url))
    ) {
      console.log(this.state.links);
      axios
        .post(`${server}/admin/saveCards`, this.state.links, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        })
        .then((res) => {
          this.setState({ status: res.data.status });
        })
        .catch(() => {
          this.setState({ status: 'Error' });
        });
    } else {
      this.setState({ status: 'Fill Everything First' });
    }
  };

  componentDidMount() {
    axios
      .get(`${server}/admin/loadCards`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
      .then((res) => {
        const data = res.data;

        if (!('status' in data)) {
          this.setState(data);
        }
        this.setState({
          userImg:
            data.userImg === '' || !('userImg' in data)
              ? defaultImg
              : data.userImg,
        });
      })
      .catch(() => {
        this.setState({ status: 'Error' });
      });
  }

  render() {
    let statusMessage = '';
    let settingsStatus = '';
    switch (this.state.status) {
      case 'Okay':
        statusMessage = <i className='fas fa-check'></i>;
        settingsStatus = 'settingsStatusGood';
        break;
      case 'Error':
        statusMessage = <i className='fas fa-times'></i>;
        settingsStatus = 'settingsStatusBad';
        break;
      case 'Fill Everything First':
        statusMessage = (
          <div>
            <i className='fas fa-times'></i>
            <span style={{ marginLeft: '10px' }}>{this.state.status}</span>
          </div>
        );
        settingsStatus = 'settingsStatusBad';
        break;
      case 'Saving':
        statusMessage = <i className='fas fa-spinner'></i>;
        settingsStatus = 'settingsStatusNeutral';
        break;
      default:
        settingsStatus = 'settingsStatusHide';
        break;
    }

    return (
      <div className='main'>
        <Header
          userImg={this.state.userImg}
          name={this.props.user.username}
          handleLogout={this.props.handleLogout}
          calledFrom='MyCards'
        />
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <Droppable droppableId={'cardsDndId'}>
            {(provided) => (
              <div
                className='cardsDroppable'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.state.links.map((elem, i) => {
                  return (
                    <MyCard
                      key={i}
                      id={elem.name + elem.url + elem.enabled + i}
                      index={i}
                      name={elem.name}
                      url={elem.url}
                      enabled={elem.enabled}
                      updateLink={this.updateLink}
                      switchEnable={this.switchEnable}
                      deleteLink={this.deleteLink}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className='cardsButtons'>
          <div className='cardsButton' onClick={this.addLink}>
            Add
          </div>
          <div className='cardsButton' onClick={this.saveLinks}>
            Save
          </div>
        </div>
        <Footer />
        <div className={`settingsStatus ${settingsStatus}`}>
          {statusMessage}
        </div>
      </div>
    );
  }
}

const protocolURL = (url) => {
  var pattern = new RegExp('^(https?:\\/\\/)');
  if (!pattern.test(url)) {
    return 'https://'.concat(url);
  } else {
    return url;
  }
};

const validateURL = (url) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(url);
};

export default MyCards;
