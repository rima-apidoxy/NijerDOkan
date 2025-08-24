"use client";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-8xl font-extrabold text-blue-700 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>
            <a
                href="/"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 shadow"
            >
                Back to Home
            </a>
        </div>
    );
}
