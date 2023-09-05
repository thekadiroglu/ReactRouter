import React, { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import Header from "./components/header"

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const [selectedContactId, setSelectedContactId] = useState(null);
   const navigate = useNavigate();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>emirhan LTD.</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                    onClick={() => setSelectedContactId(contact.id)}
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                      <img className="smallPic" src={contact.avatar} alt="" />
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
          <Header
          firstName={contacts.length > 0 ? contacts[0].first : ''}
          lastName={contacts.length > 0 ? contacts[0].last : ''}
          avatar={contacts.length > 0 ? contacts[0].avatar : ''}
        />
        {contacts.length === 0 ? (
          <p>
            İçerisi boş, bir şeyler ekle
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </p>
        ) : selectedContactId ? (
          <Outlet />
        ) : (
          <p>
            Lütfen yan taraftan birini seçiniz
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </p>
        )}
      </div>
    </>
  );
}
