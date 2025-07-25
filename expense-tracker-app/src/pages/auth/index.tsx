import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  //   async function signin() {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   }
  const signInWithGoogle = async () => {
    if (window.Cypress) {
  console.log("✅ Cypress mode detected!");

  const fakeResult = {
    user: {
      uid: '123',
      displayName: 'Test User',
      photoURL: 'http://example.com/photo.jpg'
    }
  };

  const authInfo = {
    userID: fakeResult.user.uid,
    name: fakeResult.user.displayName,
    profilePhoto: fakeResult.user.photoURL,
    isAuth: true,
  };

  localStorage.setItem("auth", JSON.stringify(authInfo));
  navigate("/expense-tracker");
  return;
}

    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID :results.user.uid,
      name : results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };
  return (
    <div>
      {/* <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />c 
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signin}>sign in</button> */}
      <h3 data-testid="cypress-title">sign in with google to continues</h3>
      
      <button onClick={signInWithGoogle}>sign in</button>
    </div>
  );
};
