/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, useLoaderData } from "react-router-dom";
import type { Params } from "react-router"
import { getContact } from "../contacts";

export interface IContact {
  first?: string;
  last: string;
  avatar: string | undefined;
  twitter: string;
  notes: string;
  favorite: boolean;
  id?: string
}
// 索引签名,接受任何属性
type AnyPropsObject = {
  [key: string]: any;
};
type LoaderData = {
  contacts: IContact[];
};
export async function loader({ params }: any) {
  const contact = await getContact(params.contactId) || {};
  return { contact };
}
export default function Contact() {
  const { contact }: any = useLoaderData();

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
                if (!confirm('Please confirm you want to delete this record.')) {
                  event.preventDefault();
                }
              }}>
              <button type='submit'>Delete</button>
            </Form>
          </div>
        </div>
      </div>
      <div className="box" style={{ display: "flex", flexDirection: "column" }}>
        <div className="ul li">1</div>
        <div className="ul li">2</div>
        <div className="ul li">3</div>
        <div className="ul li">44</div>
        <div className="ul li">4</div>
        <div className="ul li">4</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">55</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">55</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5</div>
        <div className="ul li">5  5 </div>
      </div></>
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
