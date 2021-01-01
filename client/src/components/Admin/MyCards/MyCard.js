import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class MyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div
            className='cardsDraggable'
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <h1
              id={`cardsDraggable${this.props.index}`}
              {...provided.dragHandleProps}
            >
              Drag me
            </h1>
            <h1>hi {this.props.id}</h1>
          </div>
        )}
      </Draggable>
    );
  }
}

export default MyCard;
