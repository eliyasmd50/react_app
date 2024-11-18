import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="Missing">
        <h2>Posts Not Found</h2>
        <p>Well Thats Disappointing</p>
        <p>
            <Link to={'/'}>Visit our Homepage</Link>
        </p>
    </main>
  )
}

export default Missing