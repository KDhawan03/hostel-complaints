"use client";
import React, { useState } from 'react'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if(res.ok) {
            alert('signup successful');
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else {
            alert(data.error);
          }
        } catch(error) {
          alert("something went wrong");
        } finally {
          setLoading(false);
        }
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center  '>
        <input type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='password'placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type='text' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type='submit' disabled = {loading}>
          {loading?"Please wait": "Sign up"}
        </button>
    </form>
  )
}

export default Signup