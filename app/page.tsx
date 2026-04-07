"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Panel de Control</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Control students, courses, grades, and reports in one modern platform
          designed for institutions and educators.
        </p>
      </section>

      {/* Features */}
      <section className="px-6 py-12 grid gap-6 md:grid-cols-3">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Student Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Easily manage student records, enrollment, and personal data.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Course Control</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Organize courses, assign teachers, and track schedules.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Generate academic reports and gain insights from performance data.
          </p>
        </div>
      </section>

      {/* Dashboard Preview Cards */}
      <section className="px-6 pb-12 grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-2xl bg-blue-600 text-white shadow">
          <p className="text-sm">Total Students</p>
          <h4 className="text-2xl font-bold">1,250</h4>
        </div>

        <div className="p-6 rounded-2xl bg-green-600 text-white shadow">
          <p className="text-sm">Active Courses</p>
          <h4 className="text-2xl font-bold">48</h4>
        </div>

        <div className="p-6 rounded-2xl bg-purple-600 text-white shadow">
          <p className="text-sm">Teachers</p>
          <h4 className="text-2xl font-bold">32</h4>
        </div>
      </section>
    </div>
  );
}
