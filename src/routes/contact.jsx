import React, { useEffect, useState } from "react";
import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import ErrorMsg from "./errorMsg";
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
 

  const sendMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  let handleButtonClick = () => {
    if (message.trim() === "") {
      return;
      
    }
    else {
      const newMessage = { text: message, contactId: contact.id };
      setMessages([...messages, newMessage]);
      setMessage("");
      saveMessagesToLocalStorage([...messages, newMessage]);}
   
  };

  function saveMessagesToLocalStorage(messages) {
    localStorage.setItem(`message_${contact.id}`, JSON.stringify(messages));
  }

  function deleteMessage(index) {
    setMessages((prevMessages) =>
      prevMessages.filter((_, i) => i !== index)
    );
  }
  function Favorite({ contact }) {
    const fetcher = useFetcher();
    let favorite = contact.favorite;
  }
  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          alt={`${contact.first} ${contact.last}`}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        <h4>{contact.nickname}</h4>
        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form
            action={`edit`}
            onSubmit={() => {
              navigate(`/contacts/${contact.id}/edit`);
            }}
          >
            <button className="btn" type="submit">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action={`destroy`}
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button className="btn" type="submit">
              Delete
            </button>
          </Form>
        </div>
      </div>
      
      <div className="message">
        <input
          id="message"
          placeholder="Typing.."
          aria-label="message"
          type="text"
          name="message"
          onChange={sendMessage}
          value={message}
        />
        <input type="file" aria-label="message" name="message" onChange={sendMessage} />
        <button className="btn" type="button" onClick={handleButtonClick}>
          Send
        </button>
      </div>
      <div>
      {messages
    .filter((msg) => msg.contactId === contact.id)
    .map((msg, index) => (
      <p key={index.id} className="msg">
        {msg.text}{" "}
        <i
          onClick={() => deleteMessage(index)}
          className="fa-solid fa-xmark"
        ></i>
      </p>
    ))}
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={contact.favorite ? "false" : "true"}
        aria-label={
          contact.favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {contact.favorite ? "★" : "☆"}
      </button>
      </fetcher.Form>
  );
}
