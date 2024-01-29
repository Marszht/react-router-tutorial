/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';
import type { Location, useMatches } from 'react-router-dom';

import { getContacts, createContact } from '../contacts';

import { IContact } from './contact';

export async function action() {
  console.log('root.action');
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
  const navigation = useNavigation();
  let getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      let match = matches.find(m => (m.handle as any)?.scrollMode);
      if ((match?.handle as any)?.scrollMode === 'pathname') {
        console.log(location.pathname);
        return location.pathname;
      }

      return location.key;
    },
    []
  );
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
              name='search'
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
