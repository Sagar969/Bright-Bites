import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import tableWithDishes from '../../assets/images/tablewithdishes.jpg';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface reservationDataType {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialMessage: string;
}

const Reservation = ({ isOpen, setIsOpen }: ModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [specialMessage, setSpecialMessage] = useState('');
  const [isTableBooked, setIsTableBooked] = useState(false);
  let reservationData: reservationDataType = {
    name,
    phone,
    date,
    time,
    guests,
    specialMessage,
  };

  const handleClosingModal = () => {
    const section = document.querySelector('.reservation') as HTMLElement;
    const overlay = section.querySelector('.overlay') as HTMLElement;
    const modal = section.querySelector('.modal') as HTMLElement;
    overlay.style.opacity = '0';
    modal.style.top = '200%';
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('reservation', JSON.stringify(reservationData));
    setIsTableBooked(true);
  };
  const handleOnChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inp: string
  ) => {
    inp === 'name' && setName(e.target.value);
    inp === 'phone' && setPhone(e.target.value);
    inp === 'date' && setDate(e.target.value);
    inp === 'time' && setTime(e.target.value);
    inp === 'guests' && setGuests(e.target.value);
    inp === 'special-message' && setSpecialMessage(e.target.value);
  };
  const handleEdit = () => {
    setIsTableBooked(false);
  };
  const handleCancel = () => {
    setName('');
    setPhone('');
    setDate('');
    setTime('');
    setGuests('');
    setSpecialMessage('');
    setIsTableBooked(false);
    localStorage.clear();
  };

  useEffect(() => {
    const section = document.querySelector('.reservation') as HTMLElement;
    const overlay = section.querySelector('.overlay') as HTMLElement;
    const modal = section.querySelector('.modal') as HTMLElement;
    if (isOpen) {
      setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.top = '50%';
      }, 0);
    }
  }, [isOpen]);
  useEffect(() => {
    reservationData = {
      name,
      phone,
      date,
      time,
      guests,
      specialMessage,
    };
  }, [name, phone, date, time, guests, specialMessage]);
  useEffect(() => {
    const bookedTableData = JSON.parse(
      localStorage.getItem('reservation') as string
    );
    if (bookedTableData) {
      setIsTableBooked(true);
      setName(bookedTableData.name);
      setPhone(bookedTableData.phone);
      setDate(bookedTableData.date);
      setTime(bookedTableData.time);
      setGuests(bookedTableData.guests);
      setSpecialMessage(bookedTableData.specialMessage);
    }
  }, []);

  return ReactDom.createPortal(
    <>
      <section className="reservation section-wrapper">
        <div className="overlay" onClick={handleClosingModal}></div>
        <div className="modal">
          <div className="img-wrapper">
            <img src={tableWithDishes} alt="" />
          </div>
          <span className="btn-close-modal" onClick={handleClosingModal}>
            &times;
          </span>
          {isTableBooked ? (
            <TableIsBooked
              handleEdit={handleEdit}
              handleCancel={handleCancel}
              handleClosingModel={handleClosingModal}
            />
          ) : (
            <BookATable
              reservationData={reservationData}
              handleOnChangeInput={handleOnChangeInput}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Reservation;

interface BookATablePropsType {
  reservationData: reservationDataType;
  handleOnChangeInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inp: string
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const BookATable = ({
  reservationData,
  handleOnChangeInput,
  handleSubmit,
}: BookATablePropsType) => {
  return (
    <>
      <h2 className="cs-text">Book a Table</h2>
      <form id="book-table-form" method="post" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={reservationData.name}
          onChange={(e) => handleOnChangeInput(e, 'name')}
        />
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={reservationData.phone}
          onChange={(e) => handleOnChangeInput(e, 'phone')}
        />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          value={reservationData.date}
          onChange={(e) => handleOnChangeInput(e, 'date')}
        />
        <br />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          required
          value={reservationData.time}
          onChange={(e) => handleOnChangeInput(e, 'time')}
        />
        <br />

        <label htmlFor="guests">Guests:</label>
        <input
          type="number"
          id="guests"
          name="guests"
          required
          min={1}
          max={20}
          value={reservationData.guests}
          onChange={(e) => handleOnChangeInput(e, 'guests')}
        />
        <br />

        <label htmlFor="message">Special Requests:</label>
        <textarea
          id="message"
          name="message"
          value={reservationData.specialMessage}
          onChange={(e) => handleOnChangeInput(e, 'special-message')}
        ></textarea>
        <br />

        <button type="submit">Book Table</button>
      </form>
    </>
  );
};

interface TableIsBookedPropsTypes {
  handleEdit: () => void;
  handleCancel: () => void;
  handleClosingModel: () => void;
}

const TableIsBooked = ({
  handleEdit,
  handleCancel,
  handleClosingModel,
}: TableIsBookedPropsTypes) => {
  const data = JSON.parse(localStorage.getItem('reservation') as string);

  return (
    <>
      <h2>Reservation Made</h2>
      <p className="reservation-info">
        Thank you <span>{data.name}</span> for your reservation at our
        restaurant! We look forward to serving you on <span>{data.date}</span>{' '}
        at <span>{data.time}</span>. If you need to make any changes to your
        reservation, you can press any button below or contact us.
      </p>
      <button onClick={handleClosingModel}>Done</button>
      <div className="btns-container">
        <button onClick={handleEdit}>Edit Reservation</button>
        <button onClick={handleCancel}>Cancel Reservation</button>
      </div>
    </>
  );
};
