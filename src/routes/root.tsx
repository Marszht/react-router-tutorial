/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, Link, useLoaderData, Form, redirect, ScrollRestoration } from 'react-router-dom';

import { getContacts, createContact } from '../contacts';

import { IContact } from './contact';


export async function action() {
  console.log("root.action")
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
type LoaderData = {
  contacts: IContact[];
};
export default function Root() {
  const { contacts }: LoaderData = useLoaderData() as any;

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <form
            id='search-form'
            role='search'>
            <input
              id='q'
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
            />
            <div
              id='search-spinner'
              aria-hidden
              hidden={true}
            />
            <div
              className='sr-only'
              aria-live='polite'></div>
          </form>
          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
          {/* <form method='post'>
            <button type='submit'>New</button>
          </form> */}
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map(contact => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
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
      <div id='detail'>
        <Outlet />
      </div>
      <ScrollRestoration getKey={(location) => {
        // default behavior
        return location.key;
      }} />
    </>
  );
}
