import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class MyCard extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div
            className='cardsDraggable'
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              id={`cardsDraggable${this.props.index}`}
              className='cardsGrip'
              {...provided.dragHandleProps}
            >
              <i className='fas fa-grip-lines cardsGripLines'></i>
            </div>

            <div className='cardsLink'>
              <input
                type='text'
                name={'name_' + this.props.index}
                className='cardsLinkName'
                placeholder='Link Name'
                value={this.props.name}
                onChange={this.props.updateLink}
              ></input>
              <input
                type='text'
                name={'url_' + this.props.index}
                className='cardsLinkUrl'
                placeholder='Link URL'
                value={this.props.url}
                onChange={this.props.updateLink}
              ></input>
            </div>
            <div className='cardsSettings'>
              <div
                id={'cardEnable' + this.props.index}
                className={`cardsEnabled ${
                  this.props.enabled ? '' : 'cardsEnabledNo'
                }`}
                onClick={this.props.switchEnable}
              >
                <div
                  id={'cardEnableButton' + this.props.index}
                  className={`cardsEnabledCircle ${
                    this.props.enabled ? '' : 'cardsEnabledCircleNo'
                  }`}
                ></div>
              </div>
              <i
                id={'cardDelete' + this.props.index}
                className='far fa-trash-alt cardsDelete'
                onClick={this.props.deleteLink}
              ></i>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default MyCard;
