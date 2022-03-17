import { Fragment, Component } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import axios from "axios";

import InputBox from "./InputBox";

class Modal extends Component {
  state = {
    no_of_days: 1,
    price_per_person: 1,
    no_of_participant: 1,
    date: "",
    message: "",
  };

  onChange = (e) => {
    let { name, value } = e.target;
    value = parseInt(value);
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSendMail = () => {
    const { no_of_days, price_per_person, no_of_participant, date, message } =
      this.state;
    const total = no_of_days * price_per_person * no_of_participant;

    const apiData = {
      code: "A51S",
      date: date,
      days: no_of_days,
      no_of_people: no_of_participant,
      price_per_person,
      total,
      message,
      email: "bhardwav.001@gmail.com",
    };

    axios
      .post("https://test-whiteboard-api.azurewebsites.net/send-email", apiData)
      .then((res) => {
        console.log("mail send");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { no_of_days, price_per_person, no_of_participant } = this.state;
    const total = no_of_days * price_per_person * no_of_participant;
    return (
      <>
        <Transition.Root show={this.props.open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overfl  ow-y-auto"
            onClose={this.props.setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900 text-capitalize"
                        >
                          Booking Offer For
                        </Dialog.Title>
                        <div className="mt-2 flex justify-between">
                          <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Request Code
                          </label>
                          <label
                            htmlFor="code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            A4578
                          </label>
                        </div>
                        <div className="mt-2">
                          <InputBox
                            type="date"
                            name="date"
                            label="Departure Date"
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="mt-2">
                          <InputBox
                            type="number"
                            name="no_of_days"
                            label="Number Of Days"
                            onChange={this.onChange}
                            value={this.state.no_of_days}
                          />
                        </div>
                        <div className="mt-2">
                          <InputBox
                            type="number"
                            name="no_of_participant"
                            label="Number of Participants"
                            onChange={this.onChange}
                            value={this.state.no_of_participant}
                          />
                        </div>
                        <div className="mt-2">
                          <InputBox
                            type="number"
                            name="price_per_person"
                            label="Price for Person"
                            onChange={this.onChange}
                            value={this.state.price_per_person}
                          />
                        </div>
                        <hr />
                        <p>Total: {total ? total : 0}</p>
                        <div>
                          <h1>Teams and Conditions</h1>
                        </div>
                        <hr />
                        <div className="mt-2">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Message
                          </label>
                          <textarea
                            rows={4}
                            cols={25}
                            name="message"
                            onChange={(e) =>
                              this.setState({
                                ...this.state,
                                message: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        this.props.setOpen(false);
                        this.onSendMail();
                      }}
                    >
                      Send Offer
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => this.props.setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  }
}

export default Modal;
