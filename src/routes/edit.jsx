import React, { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import Header from "./components/header";

export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updates = Object.fromEntries(formData);
    await updateContact(contact.id, updates);
    navigate(`/contacts/${contact.id}`);
  };

  return (
    <>
    <Form method="post" id="contact-form" onSubmit={handleSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Nickname</span>
        <input
          placeholder="thekadiroglu"
          aria-label="NickName"
          type="text"
          name="nickname"
          defaultValue={contact.nickname}
        />
      </label>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@tom"
          defaultValue={contact.twitter}
        />
      </label>

      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>

      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(`/contacts/${contact.id}`);
          }}
        >
          Cancel
        </button>
      </p>
      </Form>
      </>
  );
}
