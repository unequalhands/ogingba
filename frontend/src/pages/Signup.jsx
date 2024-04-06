import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler=async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/auth/signup',
    {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log({data})
  }

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

        <button className="bg-slate-700 rounded-lg text-white p-3 disabled:opacity-60 hover:opacity-90">
          {' '}
          sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to={'/sign-in'}>
          <span className="text-blue-900">sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
