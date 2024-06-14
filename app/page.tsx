import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Home() {



  return (
    <div className="flex flex-col items-center justify-center min-h-center py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-l px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-red-600">MCC</span> admin
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-red-600 mb-12">
                Sign in to Account
              </h2>
              <div className="border-2 w-10 border-red-600 inline-block mb-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1"/>

                </div>

              </div>
              <div className="flex flex-col items-center mb-10">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1"/>

                </div>

              </div>
              <a
              href="#"
              className="border-2 border-red-600 text-red-600 rounded-full px-4 py-2 hover:bg-red-600 hover:text-white transition duration-300"
            > 
              Sign In
            </a>
            </div>
          </div> 
          {/* Sing in section */}
          <div className="w-2/5 bg-red-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Enter your personal details and start journey with us
            </p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-4 py-2 hover:bg-white hover:text-red-600 transition duration-300"
            > 
              Sign Up
            </a>
          </div>
          {/* Sing up section */}
        </div>
      </main>
    </div>
    
  );
}
