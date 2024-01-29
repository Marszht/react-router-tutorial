/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, useLoaderData } from 'react-router-dom';
import type { Params } from 'react-router';
import { getContact } from '../contacts';

export interface IContact {
  first?: string;
  last: string;
  avatar: string | undefined;
  twitter: string;
  notes: string;
  favorite: boolean;
  id?: string;
}
// 索引签名,接受任何属性
type AnyPropsObject = {
  [key: string]: any;
};
type LoaderData = {
  contacts: IContact[];
};
type ArrayLoaderData = Array<number>;
type ReturnType = { contact: IContact; arr: ArrayLoaderData };

async function getArrayLoader(): Promise<ArrayLoaderData> {
  await new Promise(r => setTimeout(r, 1000));
  return new Array(100).fill(null).map((_, i) => i)
}

export async function loader({ params }: any): Promise<ReturnType> {
  const p1 = getContact(params.contactId) || {};
  const p2 = getArrayLoader();
  const contact = await p1;
  const  arr  = await p2;
  return { contact, arr };
}
// const arrList =
export default function Contact() {
  const { contact, arr } = useLoaderData() as ReturnType;

  return (
    <>
      <div id='contact'>
        <div>
          <img
            key={contact.avatar}
            src={contact.avatar || undefined}
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
            )}{' '}
            <Favorite contact={contact} />
          </h1>

          {contact.twitter && (
            <p>
              <a
                target='_blank'
                href={`https://twitter.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          )}

          {contact.notes && <p>{contact.notes}</p>}

          <div>
            <Form action='edit'>
              <button type='submit'>Edit</button>
            </Form>
            <Form
              method='post'
              action='destroy'
              onSubmit={event => {
                if (
                  !confirm('Please confirm you want to delete this record.')
                ) {
                  event.preventDefault();
                }
              }}>
              <button type='submit'>Delete</button>
            </Form>
          </div>
        </div>
      </div>
      <div
        className='box'
        style={{ display: 'flex', flexDirection: 'column' }}>
        {arr.map(n => (
          <p key={n}>
            Item {n} on {location.pathname}
          </p>
        ))}
        <h3 id='heading'>This is a linkable heading</h3>
        {arr.map(n => (
          <p key={n}>
            Item {n + 100} on {location.pathname}
          </p>
        ))}
      </div>
    </>
  );
}
interface IFavoriteProp {
  contact: IContact;
}
function Favorite({ contact }: IFavoriteProp) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}
