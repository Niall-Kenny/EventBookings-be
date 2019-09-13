import React, { Component } from 'react';
import './eventsPage.css'
import Modal from '../modal/Modal';
import Backdrop from '../backdrop/Backdrop';

class EventsPage extends Component {
    state={
        createEvent:false
    }

    startCreateEventHandler = () => {
        this.setState({createEvent:true})
    }

    modalConfirmHandler = () => {
        this.setState({createEvent:false})
    }
    modalCancelHandler = () => {
        this.setState({createEvent:false})
    }
    render() {
        const {createEvent} = this.state
        
        return (
            <>
            {createEvent && <Backdrop/>}
            {createEvent && <Modal title="Add.Event" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <p>modal content</p>
            </Modal>}
            <div className="events-control">
                <p>Share your own events!</p>
                <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
            </div>
            </>
        );
    }
}

export default EventsPage;