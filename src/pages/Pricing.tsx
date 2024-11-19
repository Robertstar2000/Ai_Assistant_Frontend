import React from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon, Atom, Infinity } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <BeakerIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Research Plan
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select the plan that best fits your research needs
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:max-w-4xl lg:mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Free Tier */}
            <div className="relative flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex-1 p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Atom className="h-5 w-5 text-blue-500" />
                  Single Project
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  Perfect for individual research projects
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">Free</span>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  10 credits included
                </p>
              </div>
              <div className="p-6 bg-gray-50 space-y-6">
                <ul className="space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">10 research credits</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Basic analytics</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Great for a single project</span>
                  </li>
                </ul>
                <Link
                  to="/signup?plan=free"
                  className="w-full block bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Use Free Credits
                </Link>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="relative flex flex-col h-full bg-white border border-blue-200 rounded-lg shadow-sm">
              <div className="flex-1 p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Infinity className="h-5 w-5 text-blue-500" />
                  Unlimited Research
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  For dedicated researchers
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$10</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
              </div>
              <div className="p-6 bg-gray-50 space-y-6">
                <ul className="space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Unlimited research credits</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Advanced analytics</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Priority support</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Great for several projects</span>
                  </li>
                </ul>
                <Link
                  to="/signup?plan=premium"
                  className="w-full block bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Buy Unlimited Credits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}