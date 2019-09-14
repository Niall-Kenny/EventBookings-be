import React, { Component } from "react";
import "./eventsPage.css";
import Modal from "../modal/Modal";
import Backdrop from "../backdrop/Backdrop";
import axios from "axios";
import AuthContext from "../../context/auth-context";

class EventsPage extends Component {
  state = {
    createEvent: false,
    events: []
  };
  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ createEvent: true });
  };

  modalConfirmHandler = () => {
    this.setState({ createEvent: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;
    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    )
      return;
    const event = { title, price, date, description };
    console.log(event);
    const requestBody = {
      query: `
         mutation{
            createEvent(eventInput: {title: "${title}", description: "${description}",price: ${price},date:"${date}"}){
                _id
                title
                description
                price
                date
                creator{
                   _id
                   email 
                }
                }
            }
        `
    };

    const token = this.context.token;

    axios
      .post("http://localhost:4000/graphql", requestBody, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed!!");
        }
        this.fetchEvents();
      })
      .catch(err => console.log("in error!", err.message));
  };

  fetchEvents = () => {
    const requestBody = {
      query: `
           query{
              events{
                  _id
                  title
                  description
                  price
                  date
                  creator{
                     _id
                     email 
                    }
                }
            }
        `
    };

    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed!!");
        }
        const { events } = res.data.data;
        console.log(events);
        this.setState({ events });
      })
      .catch(err => console.log("in error!", err.message));
  };

  modalCancelHandler = () => {
    this.setState({ createEvent: false });
  };
  render() {
    const { createEvent, events } = this.state;
    const eventList = events.map(({ title, _id }) => (
      <li className="events__list-item" key={_id}>
        {title}
      </li>
    ));
    return (
      <>
        {createEvent && <Backdrop />}
        {createEvent && (
          <Modal
            title="Add.Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form action="">
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Share your own events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        <ul className="events__list">{eventList}</ul>
      </>
    );
  }
}
EventsPage.contextType = AuthContext;
export default EventsPage;
