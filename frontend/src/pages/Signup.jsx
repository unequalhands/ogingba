import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="my-7 text-3xl text-center font-semibold">Signup</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="username"
            className="p-3 rounded-lg border hover:opacity-80"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="p-3 rounded-lg border hover:opacity-80"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="p-3 rounded-lg border hover:opacity-80"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 rounded-lg text-white p-3 disabled:opacity-60 hover:opacity-90"
          >
            {' '}
            {loading ? 'loading....' : 'sign up'}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>have an account?</p>
          <Link to={'/sign-in'}>
            <span className="text-blue-900">sign in</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    );
  };

export default Signup;
