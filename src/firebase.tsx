import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkuTvxU8gVk0Q_BVyI2PcLAP97ntAdoho",
  authDomain: "foundry-8bf54.firebaseapp.com",
  projectId: "foundry-8bf54",
  storageBucket: "foundry-8bf54.appspot.com",
  messagingSenderId: "845741803518",
  appId: "1:845741803518:web:621b79034f9acc392822af",
  measurementId: "G-ZT82WCFGTG",
};

if (typeof window !== "undefined") {
  ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"].forEach((key) => {
    if (!firebaseConfig[key as keyof typeof firebaseConfig]) {
      console.warn(`Firebase config key "${key}" is missing or empty. This can cause auth/configuration-not-found.`);
    }
  });
}

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;

export { app, analytics };