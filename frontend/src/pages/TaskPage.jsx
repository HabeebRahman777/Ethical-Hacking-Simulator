import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "NoSQL Injection Basics",
      description:
        "Learn the basics of NoSQL injection and how to exploit it in a safe environment.",
      link: "/tasks/nosql",
    },
    {
      id: 2,
      title: "Reflected Cross-Site Scripting (XSS)",
      description:
        "Discover the vulnerabilities of XSS and how attackers exploit it.",
      link: "/tasks/RXSS",
    },
    {
      id: 3,
      title: "Stored Cross-Site Scripting (XSS)",
      description:
        "Explore the dangers of stored XSS, where malicious scripts are saved in the database and executed whenever the affected page is loaded.",
      link: "/tasks/SXSS",
    },
    {
      id: 4,
      title: "Command Injection",
      description:
        "Command injection occurs when an attacker can manipulate system commands by injecting malicious input through a vulnerable application.",
      link: "/tasks/command-injection",
    },
    {
      id: 5,
      title: "Open Redirect",
      description:
        "Open redirect vulnerabilities occur when an attacker can manipulate the URL to redirect users to malicious sites without their consent.",
      link: "/tasks/open-redirect",
      url: "http://localhost:5173/tasks/openredirect-Home",
    },
    {
      id: 6,
      title: "File Upload Vulnerability",
      description:
        "File upload vulnerabilities occur when an attacker can upload a malicious file to the server, potentially leading to code execution or data breaches.",
      link: "/tasks/file-upload",
    },
    {
      id: 7,
      title: "CSRF Token Vulnerability",
      description:
        "Cross-Site Request Forgery (CSRF) vulnerabilities occur when attackers trick users into making unintended requests to the server.",
      link: "/tasks/csrf",
    },
    {
      id: 8,
      title: "IDOR Vulnerability",
      description:
        "Discover the risks associated with IDOR vulnerabilities, where attackers can access restricted data by manipulating URLs or parameters.",
      link: "/tasks/IDOR",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Available Challenges
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <Link
              to={{
                pathname: task.link,
                search: task.url
                  ? `?redirect=${encodeURIComponent(task.url)}`
                  : "",
              }}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              Start Challenge
              <ArrowRightCircle className="ml-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
