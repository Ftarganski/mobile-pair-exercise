import React, { useState, useEffect } from "react";
// import moment, { Moment } from "moment";

import logo from "./abc-glofox-logo.png";
import "./App.css";

type Staff = {
  createdAt: string;
  id: string;
  name: string;
  type: "trainer" | "receptionist" | "admin";
};
type StaffAPIResponse = Staff[];
type Trainer = Staff & {
  type: "trainer";
};

type AppointmentAPIRequestBody = {
  name: string;
  email: string;
  dateTime: string;
  trainerId: Trainer["id"];
};

const STAFF_ENDPOINT = "https://64df526f71c3335b25826fcc.mockapi.io/trainers";
const APPOINTMENT_ENDPOINT =
  "https://64df526f71c3335b25826fcc.mockapi.io/appointment";

// function toMoment(x: string): Moment {
//   const date = moment(x);
//   if (date.isValid()) {
//     return date;
//   }
//   throw new Error("computer says no");
// }

function isTrainer(x: Staff): x is Trainer {
  return x.type === "trainer";
}

const config = {
  name: {
    id: "name",
    name: "name",
    type: "email",
    minLength: 1,
    maxLength: 10,
    required: true,
  },
  email: {
    id: "email",
    name: "email",
    type: "email",
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  dateTime: {
    id: "dateTime",
    name: "dateTime",
    type: "datetime-local",
    min: "1900-01-01",
    max: "2005-31-12",
    required: true,
  },
  trainer: {
    id: "trainer",
    name: "trainer",
    type: "select",
    options: [
      /* fetch */
    ],
    required: true,
  },
};

function fetchStaff(): Promise<StaffAPIResponse> {
  return fetch(STAFF_ENDPOINT)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching staff:", error);
      return [];
    });
}

function onSubmit(
  e: React.FormEvent<HTMLFormElement>,
  formData: AppointmentAPIRequestBody,
  setAppointmentCreated: React.Dispatch<React.SetStateAction<boolean>>,
  setFormData: React.Dispatch<React.SetStateAction<AppointmentAPIRequestBody>>
) {
  e.preventDefault();

  const emptyFormData: AppointmentAPIRequestBody = {
    name: "",
    email: "",
    dateTime: "",
    trainerId: "",
  };

  fetch(APPOINTMENT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Appointment created:", data);
      setAppointmentCreated(true);
      setFormData(emptyFormData);
    })
    .catch((error) => {
      console.error("Error creating appointment:", error);
    });
}

function App() {
  const [appointmentCreated, setAppointmentCreated] = useState(false);
  const [formData, setFormData] = useState<AppointmentAPIRequestBody>({
    name: "",
    email: "",
    dateTime: "",
    trainerId: "",
  });
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    fetchStaff()
      .then((data) => {
        const trainerOptions = data.filter(isTrainer);
        setTrainers(trainerOptions);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });
  }, []);

  console.log("appointmentCreated:", appointmentCreated);
  console.log("formData:", formData);

  return (
    <div className="App">
      <header className="app__header">
        <img src={logo} className="ApP--logo" alt="logo" />
      </header>
      <main className="appmain">
        {/* <form
          className="form"
          onSubmit={(e) =>
            onSubmit(e, formData, setAppointmentCreated, setFormData)
          }
        >
          <label
            htmlFor={config.name.name}
            id={config.name.id}
            className="field"
          >
            Name:
          </label>
          <input id="name" name="name" />

          <label
            htmlFor={config.email.name}
            id={config.email.id}
            className="field"
          >
            Email:
          </label>
          <input id="email" name="email" type="email" />

          <label
            htmlFor={config.dateTime.name}
            id={config.dateTime.id}
            className="field"
          >
            Date and Time:
          </label>
          <input id="dateTime" type="datetime-local" />

          <label htmlFor="trainer" className="field">
            Trainer:
          </label>
          <select
            id={config.trainer.id}
            name={config.trainer.name}
            value={formData.trainerId}
            onChange={(e) =>
              setFormData({ ...formData, trainerId: e.target.value })
            }
          >
            <option value="">Select a trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
          {appointmentCreated && (
            <div className="message">
              {formData.name}, your appointment is scheduled for{" "}
              {formData.dateTime} with the trainer {formData.trainerId}.
            </div>
          )}
        </form> */}

        <form
          className="form"
          onSubmit={(e) =>
            onSubmit(e, formData, setAppointmentCreated, setFormData)
          }
        >
          <label
            htmlFor={config.name.name}
            id={config.name.id}
            className="field"
          >
            Name:
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label
            htmlFor={config.email.name}
            id={config.email.id}
            className="field"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label
            htmlFor={config.dateTime.name}
            id={config.dateTime.id}
            className="field"
          >
            Date and Time:
          </label>
          <input
            id="dateTime"
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) =>
              setFormData({ ...formData, dateTime: e.target.value })
            }
          />

          <label htmlFor="trainer" className="field">
            Trainer:
          </label>
          <select
            id={config.trainer.id}
            name={config.trainer.name}
            value={formData.trainerId}
            onChange={(e) =>
              setFormData({ ...formData, trainerId: e.target.value })
            }
          >
            <option value="">Select a trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
          {appointmentCreated && (
            <div className="message">
              {formData.name}, your appointment is scheduled for{" "}
              {formData.dateTime} with the trainer {formData.trainerId}.
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
