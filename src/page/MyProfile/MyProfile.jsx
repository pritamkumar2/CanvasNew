import React from "react";
import { useAuth } from "../../ContextApi/AppProvider";
import OrderHistory from "./OrderHistory";

const MyProfile = () => {
  const { user } = useAuth();
  const firstLetter = user?.msg?.username
    ? user.msg.username.substring(0, 1)
    : "";

  return (
    <div className="grid grid-cols-3 gap-4 justify-center items-center">
    
      <div className="col-span-1">
        <div className=" max-w-sm">
          <div className="rounded-lg border bg-white px-4  pb-10 shadow-lg">
            <div className="relative mx-auto w-36 rounded-full">
              <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <img
                className="mx-auto h-auto w-full rounded-full"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
              {user?.msg?.username}
            </h1>
            <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
              {user?.msg?.email}
            </h3>
            <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto, placeat!
            </p>
            <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                    online
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Joined On</span>
                <span className="ml-auto">Apr 08, 2022</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-2">
      
        <OrderHistory />
      </div>
    </div>
  );
};

export default MyProfile;
