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
    this.state = { links: ['A', 'B', 'C', 'D', 'E'] };
  }

  onDragStart = (result) => {
    const { source } = result;
    document.getElementById(`cardsDraggable${source.index}`).style.color =
      'red';
  };

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    document.getElementById(`cardsDraggable${source.index}`).style.color =
      'inherit';

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const updatedLinks = [...this.state.links];
    updatedLinks.splice(source.index, 1);
    updatedLinks.splice(destination.index, 0, draggableId);

    this.setState({ links: updatedLinks });
  };

  componentDidMount() {
    axios
      .get(`${server}/admin/loadSettings`, {
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
          this.setState({
            userImg:
              data.userImg === '' || !('userImg' in data)
                ? defaultImg
                : data.userImg,
          });
        }
      })
      .catch(() => {
        this.setState({ status: 'Error' });
      });
  }

  render() {
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
          <h1>Test</h1>
          <Droppable droppableId={'cardsDndId'}>
            {(provided) => (
              <div
                className='cardsDroppable'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.state.links.map((elem, i) => {
                  return <MyCard key={elem} id={elem} index={i} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          ;
        </DragDropContext>
        <Footer />
      </div>
    );
  }
}

export default MyCards;
