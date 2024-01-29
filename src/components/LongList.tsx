import { useLoaderData, useLocation } from "react-router-dom";

interface ArrayLoaderData {
  arr: Array<number>;
}

export async function getArrayLoader(): Promise<ArrayLoaderData> {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    arr: new Array(100).fill(null).map((_, i) => i),
  };
}

const LongList = (props: Props) => {
  const data = useLoaderData() as ArrayLoaderData;
  const location = useLocation();
  return (
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
  )
}

export default LongList