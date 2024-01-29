/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  ScrollRestoration,
  useNavigation,
  useParams
} from 'react-router-dom';
import type { Location, useMatches, LoaderFunctionArgs } from 'react-router-dom';

import { getContacts, createContact } from '../contacts';

import { IContact } from './contact';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");
  const contacts = await getContacts(q);
  return { contacts, q };
}
type LoaderData = {
  contacts: IContact[];
};
export default function Root() {
  const { contacts, q }: LoaderData = useLoaderData() as any;
  const navigation = useNavigation();
  const { contactId } = useParams();
  const contactRole = contacts.find(item => item.id === contactId)?.first
  const getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      const match = matches.find(m => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === 'pathname') {
        console.log(location);
        return location.pathname;
      }
      // if (~(contactRole?.indexOf("mars") ?? -1)) {
      //   console.log("contactRole", contactRole)
      //   return location.pathname;
      // }

      return location.key;
    },
    []
  );
  useEffect(() => {
    const ele = document.getElementById("q") as HTMLInputElement | null;
    if (ele) {
      ele.value = q;
    }
  }, [q]);
  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <div>
          <Form
            id='search-form'
            role='search'>
            <input
              id='q'
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='search'
              defaultValue={q}
            />
            <div
              id='search-spinner'
              aria-hidden
              hidden={true}
            />
            <div
              className='sr-only'
              aria-live='polite'></div>
          </Form>
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
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
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
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
      <ScrollRestoration getKey={getKey} />
    </>
  );
}
